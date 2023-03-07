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
  func ClickToVideo(CallerName: String) {

    // let jsonData = SettingsJSON.data(using: .utf8)!
    // let Settings: GenesysSettings = try! JSONDecoder().decode(GenesysSettings.self, from: jsonData)

    // let customFields = ["firstName": Settings.customerName,
    //                     "lastName": Settings.customerName] as [String : Any]
    // let memberInfo = ["displayName": Settings.customerName,
    //                   "customFields": customFields] as [String : Any]

    // let configurations = GenesysConfigurations(environment: .live, organizationID: Settings.organizationId, deploymentID: Settings.deploymentId, tenantId: Settings.tenantId, environmentURL: Settings.environment, queue: Settings.queue, engineUrl: Settings.videoengagerUrl)
    

    let customFields = ["firstName": CallerName,
                      "lastName": CallerName] as [String : Any]
    let memberInfo = ["displayName": CallerName,
                    "customFields": customFields] as [String : Any]

    let configurations = GenesysConfigurations(environment: .staging,
                            organizationID: "639292ca-14a2-400b-8670-1f545d8aa860",
                            deploymentID: "1b4b1124-b51c-4c38-899f-3a90066c76cf",
                            tenantId: "oIiTR2XQIkb7p0ub",
                            environmentURL: "https://api.mypurecloud.de",
                            queue: "Support",
                            engineUrl: "staging.videoengager.com")
                            

    // let engine = GenesysEngine(environment: .live, isVideo: true, memberInfo: memberInfo)
    let engine = GenesysEngine(environment: .live, isVideo: true, configurations: configurations, memberInfo: memberInfo)
    let lang = "en_US"
    SmartVideo.delegate = self
    SmartVideo.chatDelegate = self
    SmartVideo.setLogging(level: .verbose, types: [.all])
    SmartVideo.connect(engine: engine, isVideo: true, lang: lang)
  }
  
  open override func supportedEvents() -> [String]! {
    return ["Ve_onError", "Ve_onChatMessage"]
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
    print("3")
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
