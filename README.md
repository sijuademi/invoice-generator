# Invoice Generator

A modern, responsive invoice management application built with React and Vite. Create, edit, filter, and manage invoices with ease, featuring dark mode support and real-time form validation.

## Features

- ✨ **Create & Edit Invoices** — Easily create new invoices or edit existing ones with a smooth drawer interface
- 🎨 **Dark Mode** — Seamless light/dark theme toggle across the entire application
- 📱 **Responsive Design** — Fully optimized for desktop, tablet, and mobile devices
- 🔍 **Filter & Search** — Filter invoices by status (Draft, Pending, Paid)
- ✅ **Form Validation** — Real-time validation with detailed error messages using Zod
- 🗑️ **Delete Invoices** — Confirm before deleting with a safety modal
- 💾 **Status Management** — Mark invoices as paid, pending, or save as draft
- ⌨️ **Keyboard Navigation** — Press ESC to close forms, full keyboard accessibility
- 📊 **Invoice Summary** — View detailed invoice information with professional formatting

## Tech Stack

- **Frontend Framework** — React 18 with Hooks
- **Build Tool** — Vite
- **Styling** — Tailwind CSS + custom theme system
- **Form Management** — React Hook Form
- **Validation** — Zod
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **State Management** — Context API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sijuademi/invoice-generator.git
   cd invoice-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Creating an Invoice

1. Click the "New Invoice" button
2. Fill in the required fields (Bill From, Bill To, Items)
3. Choose to save as draft or send immediately

### Editing an Invoice

1. Click on an invoice from the list
2. Click the "Edit" button
3. Make your changes and save

### Managing Status

- **Mark as Paid** — Change pending invoices to paid status
- **Delete** — Remove invoices (requires confirmation)
- **Filter** — Use the filter dropdown to view by status

### Dark Mode

Click the theme toggle in the sidebar to switch between light and dark modes

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── form/           # Invoice form components
│   ├── invoice/        # Invoice display components
│   └── ui/             # Shared UI elements
├── contextapi/         # React Context (Theme, Invoice state)
├── constants/          # Theme and default values
├── hooks/              # Custom React hooks
├── lib/                # Utilities and validation schemas
├── pages/              # Page components
└── App.jsx             # Main app component
```

## Development

- Run dev server: `npm run dev`
- Build for production: `npm run build`
- Preview build: `npm run preview`
- Lint code: `npm run lint`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
