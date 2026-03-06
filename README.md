# NEXUS NEWS Aggregator

NEXUS NEWS is a modern, high-performance news aggregator built with React, TypeScript, and Tailwind CSS. It provides a sleek, dynamic interface for staying updated with the latest headlines across technology, business, sports, politics, and global affairs, powered by the **NewsData.io API**.

![NEXUS NEWS Header](https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1170&auto=format&fit=crop)

## 🚀 Features & Additions

- **NewsData.io API Integration**: Fully connected to a live news database, fetching the latest real-world stories instantly with cover images and publisher details.
- **Dynamic Categories (Sidebar)**: Interactive Topic filters (Technology, Business, Sports, etc.) that instantly re-fetch targeted news from the API with zero page refreshes.
- **Infinite 'Load More' Pagination**: Fluidly append the next contiguous page of news directly into your feed using cursor-based pagination tokens.
- **Live Search Functionality**: Search global news via the unified Header input. Protected by form-submission to prevent exhausting API limits.
- **Outbound "Read Article" Links**: Hoverable links on every Article Card that securely open the full publisher's story in a new browser tab (`rel="noopener noreferrer"`).
- **Light & Dark Mode**: Seamlessly toggle between a vibrant light theme or a sleek, glassmorphic dark theme using the Header's Sun/Moon icon.
- **Custom Scrollbar**: A premium, un-intrusive slim scrollbar integrated for a highly polished feel.
- **Grid vs List Views**: Instantly toggle your feed's layout for dense scanning or media-rich browsing.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [NewsData.io API](https://newsdata.io/)

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your Environment variable file:
   - Create a `.env` file in the root directory.
   - Add your API Key: `VITE_NEWSDATA_API_KEY=your_api_key_here`
   - *(A `.env.example` file is provided)*

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `src/components/`: Reusable UI components (`Header`, `Sidebar`, `ArticleCard`).
- `src/data/`: Structured category configurations for the Sidebar.
- `src/App.tsx`: Main application shell, state management, and primary API fetching logic.
- `src/index.css`: Tailwind CSS global typography, variables, themes, and custom scrollbars.

## 📄 License

This project is open-source and available under the MIT License.
