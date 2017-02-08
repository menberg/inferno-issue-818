<p align='center'>
  <h1 align='center'>inferno-issue-818</h1>
</p>

Bug found when using react-hot-loader 3.0.0-beta.6 with inferno-compat 1.3.0-rc.2.

Steps to reproduce:
#### 1) npm install
#### 2) npm run dev
#### 3) visit localhost:1337

This leads to "Uncaught TypeError: Cannot set property createElement of #\<Object> which has only a getter" (patch.dev.js:179)

Check https://github.com/infernojs/inferno/issues/818 for more information.
