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

@objc(VeReactModule)
class VeReactModule: RCTEventEmitter {
  
  @objc(ClickToVideo:)
  func ClickToVideo(CallerName: String) {
    
    let customFields = ["firstName": CallerName,
                        "lastName": CallerName] as [String : Any]
    let memberInfo = ["displayName": CallerName,
                      "customFields": customFields] as [String : Any]
    
    let engine = GenesysEngine(environment: .live, isVideo: true, memberInfo: memberInfo)
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
