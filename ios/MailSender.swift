//
//  MailSender.swift
//  SmartVideo
//
//  Created by Slav Sarafski on 27.10.22.
//  Updated by Pavan Welihinda
//

import MessageUI
import SmartVideoSDK

public class MailSender: NSObject {
    
    static let shared = MailSender()
    
    static let mails = ["engineering@videoengager.com"]
    static let path = "SmartVideoLogs"
    
    static func SendHistory() -> Bool {
      if(MFMailComposeViewController.canSendMail()){
        DispatchQueue.main.async {
          let mailComposer = MFMailComposeViewController()
          mailComposer.mailComposeDelegate = MailSender.shared
          mailComposer.setToRecipients(mails)
            mailComposer.setSubject("React Native with iOS SDK \(SmartVideo.version) demoApp crash report")
          mailComposer.setMessageBody("", isHTML: false)
          
          let history = Logging.fullHistory()
          
          if let data = history.data(using: .utf8) {
            mailComposer.addAttachmentData(data, mimeType: "text/plain", fileName: path)
            topViewController.present(mailComposer, animated: true, completion: nil)
          }
        }
        return true
      }
      return false
    }
    
    static var topViewController: UIViewController {
        let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first

        if var topController = keyWindow?.rootViewController {
            while let presentedViewController = topController.presentedViewController {
                topController = presentedViewController
            }

            return topController
        }
        return UIViewController()
    }
}

extension MailSender: MFMailComposeViewControllerDelegate {
  public func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        controller.dismiss(animated: true, completion: nil)
    }
}
