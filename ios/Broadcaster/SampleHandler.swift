//
//  SampleHandler.swift
//  Broadcaster
//
//  Created by Slav Sarafski on 9.03.23.
//

import ReplayKit
import SmartVideoSDK

class SampleHandler: RPBroadcastSampleHandler, SmartVideoShareScreenDelegate {
    
    let shareScreen = SmartVideoShareScreen(appGroupName: "group.com.videoengager.smartvideodemoapp.react")
    
    override init() {
        super.init()
        
        SmartVideo.setLogging(level: .verbose, types: [.sharescreen])
        self.shareScreen.delegate = self
    }
    
    override func broadcastStarted(withSetupInfo setupInfo: [String: NSObject]?) {
        self.shareScreen.start()
    }
    
    override func broadcastPaused() {
        self.shareScreen.pause()
    }
    
    override func broadcastResumed() {
        self.shareScreen.resume()
    }
    
    override func broadcastFinished() {
        self.shareScreen.stop()
    }
    
    override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
        self.shareScreen.processSampleBuffer(sampleBuffer, with: sampleBufferType)
    }
    
    func finished(with error: Error) {
        finishBroadcastWithError(error)
    }
}
