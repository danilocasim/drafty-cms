# **Drafty Author Frontend**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

**Drafty Author Frontend** is the admin interface for content creators to manage blog posts. It interacts with the **Drafty API** backend for creating, editing, and deleting posts.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [API Integration](#api-integration)
* [Setup & Installation](#setup--installation)
* [Backend Reference](#backend-repository-drafty-api)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* Create, update, and delete posts
* Manage categories (implicit via posts)
* View comments and delete inappropriate ones
* User authentication with JWT
* Responsive dashboard layout

---

## Tech Stack

* **Frontend:** React, CSS Modules, Vite
* **State Management:** React Context
* **API:** REST (consumes Drafty API backend)

---

## API Integration

This frontend communicates with the **Drafty API** for authoring operations.

Key endpoints used:

* `POST /post` – Create new post
* `PUT /post/:id` – Update post
* `DELETE /post/:id` – Delete post
* `GET /category` – Fetch categories
* `GET /post/:id/comments` – Manage comments

## **Backend Repository:** [Drafty API](https://github.com/danilocasim/drafty-api)

---

## Setup & Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:danilocasim/drafty-cms.git
   cd drafty-cms
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`)

   ```env
   VITE_API_URL=https://drafty-api.vercel.app/blog/v1
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

---

## Contributing

Follow the same contribution guidelines as the Reader frontend.

---

## License

MIT License – see [LICENSE](LICENSE) for details
