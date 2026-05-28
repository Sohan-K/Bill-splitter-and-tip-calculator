HOW TO RUN THE CODE:
Just click on the Vercel link in the readme file. OR download the zip file, extract it and run from index.html, so additional stuff to install

WHY THIS STACK
Due to limited time and mostly due to the fact that this just a proof of concept project and not a flashy design implementation. It also keeps the application light and allows for smoother calculations. Due to this I can get instant calculations without any delay. Just as asked in the requirements document

As for design choices:
Choice 1 was keeping all the interacting part on the left and all the result part on the right to create a visual difference between the both areas. Don't want the user to get inter mixed in the writing and checking part. But on mobile version this all becomes into a single column to keep the size readable and keep the screen less cluttered. The grid-template-columns and .app section were the affected sections

Choice 2 was to not use any pop-up errors or alerts of such during any error. This keeps the user from loosing the flow of their work from any interruptions and also the UI does not flicker due to this fact. Affected areas are .error-text and script.js

RESPONSIVE BEHAVIOUR:
On a 360px Mobile Screen-
layout switches to a single-column stack
spacing and margins are reduced
tip buttons reflow into a 2-column layout
larger tap targets improve touch usability
font sizes are slightly reduced to avoid overflow

On a 1440px Laptop-
the app displays in a centered two-column card layout
results remain visible beside inputs
spacing increases to make the UI feel less cramped
wider layout improves scanning and reduces vertical scrolling

FOR BETTER ACCESSIBILITY
I implemented a logical order for all the applications and made the input and output at separate sections for smooth usage and monitoring or results. Also implemented input mode as decimal and numeric only for less error scope from the user.

Skipped on implementing ARIA live="polite" as recommended by AI help

AI USAGE:
Used chatgpt to deign the basic structure of the calculator but scrapped the design offered then picked up inspo from a website's payment page and using it to create my app. Most parts were made with help pf chatgpt but some designs which required tweaking were the not uniform sizes of the tip bars which was then changed by me to make it uniform. The placeholder texted were edited for a cleaner look from "Use present tips or enter your custom one" to "Enter custom tip".

I also made reduced the padding sizes offered by chatgpt in the mobile version to ensure less empty spacing in the overall look of the app

HONEST GAP:

When calculating big amounts, on pc browser, the per person amount gets overflowed to the next line which is not a good look but no issues on the mobile version. 

Since the app uses standard 2 decimal places rounding off at specific huge amounts the per person bill might get off by few small fractions which would have taken some more maths or extra columns to show who pays extra amount(highly unlikely to add this one).

Some more accessibility features like screen readers and finally a dark and light mode toggle 

PICKED THE STANDARD 2 DECIMAL PLACE ROUNDOFF:
Since this is the industry standard for every calculating app without using any extra memory. At some amounts the per person bill may differ by a few small fractions but for a lightweight calculator like this i choose to go ahead with this option only