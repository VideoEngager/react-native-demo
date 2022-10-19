//
// VePackageModule.m
//
#import "VeReactModuleC.h"

@interface RCT_EXTERN_MODULE(VeReactModule, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

RCT_EXTERN_METHOD(ClickToVideo:(NSString *)CallerName)

@end
