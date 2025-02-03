# OpenAI API Key Tester

A modern web application built with Next.js and TypeScript that allows users to manage and test multiple OpenAI API keys through a chat interface.

## Features

- 🔑 API Key Management
  - Add multiple API keys
  - Edit key names
  - Show/hide key values
  - Delete keys
  - Secure local storage
  - Select active key for testing

- 💬 Chat Interface
  - Real-time chat with OpenAI API
  - Message history
  - Error handling
  - Loading states
  - Clear chat functionality

- 🎨 Modern UI
  - Dark theme
  - Responsive design
  - Smooth animations
  - Interactive feedback
  - Error notifications

## Technologies Used

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- React Icons
- OpenAI API
- LocalStorage for persistence

## Prerequisites

Before you begin, ensure you have:
- Node.js 16.8.0 or newer
- npm or yarn
- An OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/openai-key-tester.git
cd openai-key-tester
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required packages:
```bash
npm install openai react-icons
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
openai-key-tester/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ApiKeyManager.tsx
│   ├── ChatSection.tsx
│   └── Navbar.tsx
├── types/
│   └── index.ts
└── public/
```

## Usage

1. Add a new API key:
   - Click "Add New Key"
   - Enter a name for the key
   - Paste your OpenAI API key
   - Click "Save Key"

2. Test your API key:
   - Select the key you want to test
   - Type a message in the chat interface
   - Send and wait for the AI response
   - Check for any errors or successful responses

3. Manage your keys:
   - Show/hide key values using the eye icon
   - Edit key names using the edit button
   - Delete keys using the trash button
   - Select different keys to test

## Security Considerations

- API keys are stored in the browser's localStorage
- Keys are never sent to any server except OpenAI
- Consider implementing additional security measures for production use

## Error Handling

The application handles various error scenarios:
- Invalid API keys
- Network errors
- OpenAI API errors
- Missing keys or permissions

## Customization

### Colors
The main color scheme uses:
- Primary: `#800020` (Maroon)
- Background: `gray-900`
- Text: `gray-200`

To modify colors, edit the Tailwind classes in the component files.

### Styling
The UI is built with Tailwind CSS. Modify the classes in component files to change the appearance.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the API
- Next.js team for the framework
- Tailwind CSS for the styling system
- React Icons for the icon set

## Support

For support, issues, or feature requests, please file an issue in the GitHub repository.
