# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Copied courses and checkout

In home-page CMS edit mode, add a course or use its pencil control to edit its name, title, details, duration, and INR price. Existing browser-only copied courses are retained. Save edits, reopen the editor, and choose **Export saved course catalog**.

Replace `public/course-catalog.json` with the exported file, then run `npm run build` and deploy the build. Deploy Node API source changes as well if using the Node backend. This publishes the courses for all visitors and makes prices authoritative for both the PHP and Node Razorpay backends. Browser drafts cannot change the amount charged. Keep course IDs stable when renaming courses.

Copied course Enrol/Register buttons open `/register?course=COURSE_ID`. Registration preselects published courses and records the course ID and title with verified payment details. Unpublished courses show an availability message instead of silently selecting a different course.

Razorpay keys must be configured on the server as before. Test checkout with Razorpay test credentials before accepting live payments.
