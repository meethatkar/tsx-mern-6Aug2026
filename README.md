# 🌌 Star Wars Dex

An interactive, premium database registry (Holocron) for exploring Star Wars characters, featuring real-time data filtering, seamless pagination, and optimized asset loading.

---

## 📸 Interface Preview

### Desktop View
| Homepage Registry | Character Details Portal |
| :---: | :---: |
| ![Desktop Homepage](/image.png) | ![Desktop Popup](/image-1.png) |

### Mobile View
| Mobile Registry | Mobile Details Portal | Mobile Filter Drawer |
| :---: | :---: | :---: |
| ![Mobile Homepage](/image-2.png) | ![Mobile Popup](/image-3.png) | ![Mobile Filters](/image-4.png) |

---

## 🚀 Key Features

* **Holographic Details Portal**: Selecting a character opens a futuristic details card showing birth year, height, weight, date added, and real-time fetched homeworld parameters (climate, terrain, occupants) and featured film logs.
* **Instant Search & Advanced Filters**: Filter characters dynamically by planet, species, and films. Filters auto-reset pagination to the first page for logical browsing.
* **Intelligent Image Preloading**: Implements a chunk-based preloading queue that resolves external Lorem Picsum assets in the background, rendering subsequent pages instantaneously and solving network latency.
* **Stateless Context-Driven Hooks**: State management is centralized in `CharacterContext`, using stateless custom hooks (`usePopup`, `useCharacter`) for consistent data synchronization across all views.
* **Fluid Responsive Design**: Tailored layout supporting both desktop view grids and mobile slide-out navigation drawers.

---

## 🛠️ Architecture & Tech Stack

* **Frontend Framework**: React 18, TypeScript, Vite
* **Styling**: TailwindCSS, CSS Variables (Futuristic Dark/Neon Theme)
* **Data Fetching**: Axios, React Context API
* **Optimizations**: Custom Chunked Image Preloader, Viewport-Ahead Preloading Queue

---

## ⚙️ Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_BASE_API=https://swapi.info/api
```

### 3. Development Server
Run the local development server:
```bash
npm run dev
```