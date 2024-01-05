# doodstream-web 🎥

An SSR video streaming frontend which uses doodstream.com as a backend. It is built using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Features

- 🌐 SSR (Server Side Rendering)
- 📱 Responsive design
- 🌙 Dark mode support
- 🔍 Search videos by name
- 🗂️ Folders as Channels
- ▶️ Video player
- 📝 Video subtitles
- 📥 Video download

## Live Demo

A live demo of the project is available at [https://doodstream-web.pages.dev](https://doodstream-web.pages.dev/).

## Configuration

The following environment variables are required to run the project:
- `DOODSTREAM_API_KEY`: API key for doodstream.com
- `DOODSTREAM_API_URL`: API URL for doodstream.com (default: `https://doodapi.com`)
- `SITENAME`: Name of the website (default: `DoodWeb`)

## Development

1. Clone the repository

```bash
git clone <repo-url> doodstream-web
cd doodstream-web
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

1. Clone the repository

```bash
git clone <repo-url> doodstream-web
cd doodstream-web
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

4. Start the server

```bash
npm run start
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Disclaimer

This project is not affiliated with https://doodstream.com in any way. It is just a frontend for their API.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.