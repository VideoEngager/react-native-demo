//
//  VePackageModule.swift
//  VeTest
//
//  Created by Slav Sarafski on 17.10.22.
//

import UIKit
import Foundation
import SmartVideoSDK
import React

struct GenesysSettings: Decodable {
  let customerName: String
  let organizationId: String
  let deploymentId: String
  let videoengagerUrl: String
  let tenantId: String
  let environment: String
  let queue: String
  let avatarImageUrl: String
  let informationLabelText: String
  let backgroundImageURL: String
  let toolbarHideTimeout: String
  let customerLabel: String
  let agentWaitingTimeout: String
  let showAgentBusyDialog: String
  let allowVisitorSwitchAudioToVideo: Bool
  let callWithPictureInPicture: Bool
  let callWithSpeakerPhone: Bool
  let hideAvatar: Bool
  let hideName: Bool
}

@objc(VeReactModule)
class VeReactModule: RCTEventEmitter {
  
  @objc(ClickToVideo:)
  func ClickToVideo(settingsJSON: String) {
    
    guard let jsonData = settingsJSON.data(using: .utf8) else {
      let e = ["description": "SmartVideo parameters are not setup correctly."]
      let json = try? JSONEncoder().encode(e)
      self.sendEvent(withName: "Ve_onError", body: json)
      return
    }
    var settings: VeInitSettings
    
    do {
      settings = try JSONDecoder().decode(VeInitSettings.self, from: jsonData)
    }
    catch {
      print(error)
      let e = ["description": error.localizedDescription.description]
      let json = try? JSONEncoder().encode(e)
      self.sendEvent(withName: "Ve_onError", body: json)
      return
    }

    let customFields = ["firstName": settings.customFields?.firstName ?? "",
                        "lastName": settings.customFields?.lastName ?? "",
                        "email": settings.customFields?.email ?? "",
                        "addressStreet": settings.customFields?.addressStreet ?? "",
                        "addressCity": settings.customFields?.addressCity ?? "",
                        "addressPostalCode": settings.customFields?.addressPostalCode ?? "",
                        "addressState": settings.customFields?.addressState ?? "",
                        "phoneNumber": settings.customFields?.phoneNumber ?? "",
                        "phoneType": settings.customFields?.phoneType ?? "",
                        "customerId": settings.customFields?.customerId ?? "",
                        "customField1": settings.customFields?.customField1 ?? "",
                        "customField2": settings.customFields?.customField2 ?? "",
                        "customField3": settings.customFields?.customField3 ?? "" ] as [String : Any]
    let memberInfo = ["displayName": settings.customerName,
                    "customFields": customFields] as [String : Any]
    
    let opcvs = GenesysEngineSettings.OutgoingPreCallViewSettings(hideAvatar: settings.hideAvatar,
                                                                  hideName: settings.hideName)
    let icvs = GenesysEngineSettings.InCallViewSettings(toolBarHideTimeout: Int(settings.toolbarHideTimeout) ?? 40)
    
    let sss = GenesysEngineSettings.ShareScreenSettings(isOn: true, appGroupName: "group.com.videoengager.smartvideodemoapp.react")
    
    let ges = GenesysEngineSettings(agentWaitingTimeout: Int(settings.agentWaitingTimeout),
                                    customerLabel: settings.customerLabel,
                                    allowVisitorToSwitchAudioCallToVideoCall: settings.allowVisitorSwitchAudioToVideo,
                                    shareScreen: sss,
                                    backgroundImageURL: settings.backgroundImageURL,
                                    outgoingCallViewSettings: opcvs,
                                    inCallViewSettings: icvs
    )

    let configurations = GenesysConfigurations(environment: .staging,
                                               organizationID: settings.organizationId,
                                               deploymentID: settings.deploymentId,
                                               tenantId: settings.tenantId,
                                               environmentURL: settings.environment,
                                               queue: settings.queue,
                                               engineUrl: settings.videoengagerUrl)

    let engine = GenesysEngine(environment: .live, isVideo: true, configurations: configurations, settings: ges, memberInfo: memberInfo)
    let lang = "en_US"
    SmartVideo.delegate = self
    SmartVideo.chatDelegate = self
    SmartVideo.setLogging(level: .verbose, types: [.all])
    SmartVideo.connect(engine: engine, isVideo: true, lang: lang)
  }
  
  @objc(CallWithShortUrl::)
  func CallWithShortUrl(settingsJSON: String, url: String) {

    guard let jsonData = settingsJSON.data(using: .utf8) else {
      let e = ["description": "SmartVideo parameters are not setup correctly."]
      let json = try? JSONEncoder().encode(e)
      self.sendEvent(withName: "Ve_onError", body: json)
      return
    }
    var settings: VeInitSettings
    
    do {
      settings = try JSONDecoder().decode(VeInitSettings.self, from: jsonData)
    }
    catch {
      print(error)
      let e = ["description": error.localizedDescription.description]
      let json = try? JSONEncoder().encode(e)
      self.sendEvent(withName: "Ve_onError", body: json)
      return
    }

    let configurations = GenesysConfigurations(environment: .staging,
                                               organizationID: settings.organizationId,
                                               deploymentID: settings.deploymentId,
                                               tenantId: settings.tenantId,
                                               environmentURL: settings.environment,
                                               queue: settings.queue,
                                               engineUrl: settings.videoengagerUrl)

    SmartVideo.delegate = self
    SmartVideo.chatDelegate = self
    SmartVideo.setLogging(level: .verbose, types: [.all])
    
    let engine = GenesysEngine(environment: .staging, commType: .chat, configurations: configurations)
    SmartVideo.setup(engine: engine)
    SmartVideo.veVisitorVideoCall(link: url)
  }
  
  @objc(SetRestricted:)
  public func SetRestricted(data: String){
    SmartVideo.forbidShareScreen()
  }

  @objc(ClearRestricted:)
  public func ClearRestricted(data: String){
    SmartVideo.allowShareScreen()
  }

  @objc(CloseInteraction:)
  public func CloseInteraction(data: String){
    SmartVideo.disconnect()
  }
  
  @objc(GetVeVersion:)
  func GetVeVersion(successCallback: RCTResponseSenderBlock) {
      successCallback(["\(SmartVideo.version)"])
  }
  
  open override func supportedEvents() -> [String]! {
    return ["Ve_onError", "Ve_onChatMessage", "Ve_onCallStarted", "Ve_onCallFinished", "Ve_onCallHold"]
  }
}

extension VeReactModule: SmartVideoDelegate {
  func didEstablishCommunicationChannel(type: SmartVideoSDK.SmartVideoCommunicationChannelType) {
    
    guard let window = UIApplication.shared.windows.first,
          let rootController = window.rootViewController else {
      return
    }
    
    let outgoingCallVC = OutgoingCallVC()
    outgoingCallVC.modalPresentationStyle = .fullScreen
    rootController.present(outgoingCallVC, animated: true, completion: nil)
  }
  
  func failedEstablishCommunicationChannel(type: SmartVideoSDK.SmartVideoCommunicationChannelType) {
    
  }
  
  func callStatusChanged(status: SmartVideoSDK.SmartVideoCallStatus) {
    switch status {
    case .interactionStarted: break
    case .interactionEstablished: break
    case .callWaiting: break
    case .callStarted: self.sendEvent(withName: "Ve_onCallStarted", body: "")
    case .callOnHold: self.sendEvent(withName: "Ve_onCallHold", body: "")
    case .callHanguped: break
    case .callFinished: self.sendEvent(withName: "Ve_onCallFinished", body: "")
    @unknown default: break
    }
  }
  
  func errorHandler(error: SmartVideoError) {
    print(error.errorDescription)
    let e = ["level": "\(error.level)",
             "domain": "\(error.domain)",
             "error": error.error,
             "code": "\(error.code)",
             "description": error.errorDescription]
    let json = try? JSONEncoder().encode(e)
    self.sendEvent(withName: "Ve_onError", body: json)
  }
  
}

extension VeReactModule: SmartVideoChatDelegate {
  func genesysCloudChat(message: SmartVideoSDK.ChatMessage) {
    
    if !message.message.contains("interactionId") {
        self.sendEvent(withName: "Ve_onChatMessage", body: message.message)
    }
  }
}

public struct CustomFields: Decodable {
  public var firstName: String = ""
  public var lastName: String = ""
  public var email: String = ""
  public var addressStreet: String = ""
  public var addressCity: String = ""
  public var addressPostalCode: String = ""
  public var addressState: String = ""
  public var phoneNumber: String = ""
  public var phoneType: String = ""
  public var customerId: String = ""
  public var customField1: String = ""
  public var customField2: String = ""
  public var customField3: String = ""
}

public struct VeInitSettings: Decodable {
  public var customerName: String = ""
  public var organizationId: String = ""
  public var deploymentId: String = ""
  public var videoengagerUrl: String = ""
  public var tenantId: String = ""
  public var environment: String = ""
  public var queue: String = ""
  
  public var avatarImageUrl: String = ""
  public var informationLabelText: String = ""
  public var backgroundImageURL: String = ""
  public var toolbarHideTimeout: String = ""
  public var customerLabel: String = ""
  public var agentWaitingTimeout: String = ""
  
  public var showAgentBusyDialog: Bool = false
  public var allowVisitorSwitchAudioToVideo: Bool = false
  public var callWithPictureInPicture: Bool = false
  public var callWithSpeakerPhone: Bool = false
  public var hideAvatar: Bool = false
  public var hideName: Bool = false
  
  public var customFields: CustomFields?
}
