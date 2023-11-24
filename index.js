const express = require('express');
const app = express();
const port = 8080;

// 서버를 0.0.0.0 주소로 바인딩하여 외부에서 접근 가능하게 함
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

'use strict';

/**
 * [누구 템플레이트 설명]
 * 구글 cloud용으로 만들어진 단독 파일입니다.
 * exports.nugu_template 의 'nugu_template'는 설정된 이름에 맞추어서 바꾸어 주시면 됩니다.
 *
 * req.body는 SK nugu에서 들어오는 json입니다.
 */

exports.nugu_hiskin = (req, res) => {
    const appTitle = 'HISKIN'; // 앱 타이틀을 적어주세요
    const requestBody = req.body; //request의 body부분
    let parameters = '';

    if(requestBody.action.hasOwnProperty('parameters')){
      if(Object.keys(requestBody.action.parameters).length === 0){
        parameters = ''
      }else{
        parameters = requestBody.action.parameters// 파라메터 부분
      }
    }

    const context = requestBody.action.context; //컨텍스트, OAuth연결시 토큰이 들어옵니다
    const actionName = requestBody.action.actionName; // action의 이름
    console.log('requestBody ', JSON.stringify(requestBody));
    
    //마이크 오픈이라고 생각하는 것을 방지하기 위한 사용자 경험용 마지막 물음
    let lastTextArr = ['다음 명령을 말해주세요', '다음 질문이 있으신가요', '이제 어떤 것을 해드릴까요.', '이제 명령을 해 주세요.', '다른 질문이 있으신가요?', '이제 질문해주세요!', '또 궁금하신게 있으신가요?']
    
    //디버그 용, actionName을 표시합니다
    console.log(`request: ${JSON.stringify(actionName)}`);

    let output = {};

    // response json 필드. 여기서 json을 만들어준다.
  function makeJson(jsons) {
    let jsonReturn = {
      "version": "2.0",
      "resultCode": "OK",
      "directives": {
        "AudioPlayer": {
          "type": "AudioPlayer.Play",
          "audioItem": {
            "stream": {
              "url": "",
              "offsetInMilliseconds": "",
              "progressReport": {
                "progressReportDelayInMilliseconds": "",
                "progressReportIntervalInMilliseconds": ""
              },
              "token": "",
              "expectedPreviousToken": ""
            },
            "metadata": {}
          }
        }
      }
    }
    jsonReturn.output = jsons;
    return jsonReturn;
  }

  //액션 선언 모음, 여기서 액션을 선언해 줍니다.
  const ACTION_SKINCONCERN = 'action.skinConcern'; // 피부고민
  const ACTION_COSMETICRECOMMENDATION = 'action.cosmeticRecommendation'; // 화장품 추천
  const ACTION_DAILYCOMMUNICATION = 'action.dailyCommunication'; // 일상대화

  // Intent가 오는 부분, actionName으로 구분합니다.
  switch (actionName) {
    case ACTION_SKINCONCERN:
      // "성공1"을 전달하고자 하는 경우
      const successResponse1 = {
        "concern": parameters.concern.value
      };
      return res.send(makeJson(successResponse1));
      break;
    case ACTION_COSMETICRECOMMENDATION:
      // "성공2"를 전달하고자 하는 경우
      const successResponse2 = {
        "cosmeticRecom": parameters.cosmeticRecom.value
      };
      return res.send(makeJson(successResponse2));
      break;
    case ACTION_DAILYCOMMUNICATION:
      // "성공3"을 전달하고자 하는 경우
      const successResponse3 = {
        "dailyComm": parameters.dailyComm.value
      };
      return res.send(makeJson(successResponse3));
      break;
    // 추가적인 case들을 필요에 따라 계속해서 작성할 수 있습니다.
  }
}
