
# 清冰箱料理AI小幫手

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F%3CYOUR_GITHUB_USERNAME%3E%2F%3CYOUR_REPOSITORY_NAME%3E&env=VITE_GEMINI_API_KEY&envDescription=Your%20Google%20Gemini%20API%20Key&project-name=ai-fridge-chef&repository-name=ai-fridge-chef)

一個使用 Google Gemini API 的聊天機器人，可以根據使用者輸入的食材，以繁體中文生成簡易食譜。

## ✨ 功能特色

*   **食材輸入**: 使用者可以輸入冰箱中現有的食材。
*   **食譜生成**: AI 根據輸入的食材生成包含菜名、所需食材、烹飪步驟和小撇步的食譜。
*   **聊天介面**: 簡單直觀的聊天視窗。
*   **Markdown 格式化**: 食譜內容使用 Markdown 進行格式化，易於閱讀。
*   **響應式設計**: 適應不同螢幕尺寸。
*   **繁體中文介面**

## 🛠️ 技術棧

*   **前端**: React, TypeScript, Tailwind CSS
*   **AI**: Google Gemini API (`@google/genai`)
*   **建置工具**: Vite
*   **部署**: Vercel

## 📋 環境需求

*   [Node.js](https://nodejs.org/) (建議 LTS 版本，例如 18.x 或 20.x)
*   [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)

## 🔑 環境變數設定

此專案需要 Google Gemini API 金鑰才能運作。

1.  **取得 API 金鑰**:
    前往 [Google AI Studio](https://aistudio.google.com/app/apikey) 取得您的 API 金鑰。

2.  **本機開發環境設定**:
    *   在專案的根目錄下建立一個名為 `.env` 的檔案。
    *   在 `.env` 檔案中加入以下內容，並將 `YOUR_GEMINI_API_KEY` 替換成您自己的金鑰：
        ```
        VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```
    *   `.env` 檔案已被加入 `.gitignore`，不會被上傳到 GitHub。

3.  **Vercel 部署環境設定**:
    部署到 Vercel 時，您需要在 Vercel 專案的設定中新增一個名為 `VITE_GEMINI_API_KEY` 的環境變數，並將其值設為您的 API 金鑰。

## 🚀 開始使用 (本機開發)

1.  **複製專案庫**:
    ```bash
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
    cd <YOUR_REPOSITORY_NAME>
    ```

2.  **安裝依賴套件**:
    使用 npm:
    ```bash
    npm install
    ```
    或使用 yarn:
    ```bash
    yarn install
    ```

3.  **設定環境變數**:
    依照「🔑 環境變數設定」中的說明，建立並設定 `.env` 檔案。

4.  **啟動開發伺服器**:
    使用 npm:
    ```bash
    npm run dev
    ```
    或使用 yarn:
    ```bash
    yarn dev
    ```
    應用程式將會在本機的 `http://localhost:5173` (或 Vite 指定的其他埠號) 上運行。

## 📦 建置專案

若要建置生產版本的靜態檔案：

使用 npm:
```bash
npm run build
```
或使用 yarn:
```bash
yarn build
```
建置後的檔案會存放在 `dist` 目錄下。

## ☁️ 部署到 Vercel (透過 GitHub)

1.  **將專案推送到 GitHub**:
    *   在 GitHub 上建立一個新的儲存庫 (repository)。
    *   將您的本機專案連接到此 GitHub 儲存庫並推送程式碼：
        ```bash
        git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
        git branch -M main
        git push -u origin main
        ```

2.  **在 Vercel 上匯入專案**:
    *   登入您的 [Vercel](https://vercel.com/) 帳戶。
    *   點擊 "Add New..." -> "Project"。
    *   選擇 "Continue with GitHub" 並選擇您剛才推送的儲存庫。
    *   Vercel 通常會自動偵測到這是一個 Vite 專案。如果沒有，請手動設定：
        *   **Framework Preset**: Vite
        *   **Build Command**: `npm run build` (或 `yarn build`)
        *   **Output Directory**: `dist`

3.  **設定環境變數**:
    *   在 Vercel 專案的設定頁面 (Project Settings) 中，找到 "Environment Variables" 選項。
    *   新增一個環境變數：
        *   **Name**: `VITE_GEMINI_API_KEY`
        *   **Value**: 貼上您的 Google Gemini API 金鑰。
    *   點擊 "Save"。

4.  **部署**:
    *   點擊 "Deploy"。Vercel 將會建置並部署您的應用程式。
    *   之後，每當您推送到 GitHub 儲存庫的 `main` 分支時，Vercel 都會自動重新部署。

## 📂 專案結構

```
.
├── .gitignore          # Git 忽略檔案設定
├── index.html          # HTML 入口檔案
├── metadata.json       # 應用程式元數據
├── package.json        # 專案依賴與腳本
├── postcss.config.js   # PostCSS 設定 (用於 Tailwind)
├── README.md           # 專案說明文件 (此檔案)
├── tailwind.config.js  # Tailwind CSS 設定
├── tsconfig.json       # TypeScript 編譯器設定
├── tsconfig.node.json  # TypeScript Node 設定 (用於 Vite 設定檔)
├── vite.config.ts      # Vite 設定檔
└── src/                # 原始碼目錄
    ├── App.tsx             # 主要應用程式組件
    ├── main.tsx            # React 應用程式入口點
    ├── types.ts            # TypeScript 型別定義
    ├── index.css           # 全域 CSS 與 Tailwind 指令
    ├── components/         # UI 組件
    │   ├── ChatMessageComponent.tsx
    │   └── LoadingSpinner.tsx
    └── services/           # API 服務相關
        └── geminiService.ts
```

## 🤝 貢獻

歡迎提出問題 (issues) 或合併請求 (pull requests)。

---

祝您使用愉快！
