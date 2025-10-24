# lab7-mvc-crud
Comp 305, Fall 2025

## Overview
This project expands on the eliza chat lab from the prevopus lab by **MVC** architectural pattern.
This labs goal was to refactor the original chat interface using CRUD functionality 

## Proeject Goals
By the end of this lab, we will have:  
1. A fully functional chat application using the MVC pattern  
2. Complete CRUD operations for managing chat messages  
3. Persistent data storage with localStorage  
4. Import and export of chat history using JSON files  
5. A clear separation of responsibilities between Model, View, and Controller  

## Design Details  
The application follows the **Eliza-style** chat format from Lab 6 but is now architected for scalability and maintainability.  
- **Header:** Blue top bar with the chat title and architecture label  
- **Message Window:** Scrollable area that displays user and bot messages with timestamps and edit/delete controls  
- **Input Area:** Text box and Send button for user messages  
- **Controls:** Export, Import, and Clear buttons for managing chat data  

## Development Approach  
This lab was completed through a structured, incremental process:  
1. Refactor the chat logic from Lab 6 into separate Model, View, and Controller modules  
2. Implement CRUD operations with event-driven data updates  
3. Add localStorage persistence for data survival after refresh  
4. Apply import/export using JSON files for chat history management  
5. Clean the user interface with accessible, responsive styles  

## Repository Structure  
├── src/
│ ├── js/
│ │ ├── model.js # Data logic and CRUD operations
│ │ ├── view.js # DOM rendering and UI updates
│ │ ├── controller.js # User interaction logic and coordination
│ │ └── eliza.js # Eliza-style response logic
│ ├── app.js # Entry point importing the controller
│ ├── index.html # Main application page
│ └── styles.css # Chat interface styles
└── README.md # Project documentation

## Design Decisions  
- **MVC Pattern:** Enables clear separation of concerns and maintainable architecture  
- **localStorage:** Provides reliable client-side data persistence  
- **CRUD Operations:** Allow users to add, edit, delete, and manage messages directly  
- **Import/Export:** Offers flexibility in saving and restoring chat history  
- **CSS Variables:** Maintain consistent color themes and visual hierarchy  

## Published Site
https://app.netlify.com/projects/elisampson-lab7/overview

## License  
This project is licensed under the **MIT License** — see [LICENSE.md](LICENSE.md) for details.  

## Author  
**William Sampson**
