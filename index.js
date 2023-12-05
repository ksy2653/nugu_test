const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, GCP!');
});

// 서버를 0.0.0.0 주소로 바인딩하여 외부에서 접근 가능하게 함
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
