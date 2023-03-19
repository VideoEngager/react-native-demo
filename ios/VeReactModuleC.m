//
// VePackageModule.m
//
#import "VeReactModuleC.h"

@interface RCT_EXTERN_MODULE(VeReactModule, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

RCT_EXTERN_METHOD(ClickToVideo:(NSString *)CallerName)

RCT_EXTERN_METHOD(CallWithShortUrl:(NSString *)url)

RCT_EXTERN_METHOD(SetRestricted:(NSString *)data)

RCT_EXTERN_METHOD(ClearRestricted:(NSString *)data)

@end
