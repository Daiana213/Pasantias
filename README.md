# Firebase Studio (Pasantías UTN)

This is a Next.js starter project for Pasantías UTN, initially set up in Firebase Studio.

To get started locally, take a look at `src/app/page.tsx` and run:
```bash
npm run dev
```

## Deploying to GitHub Pages

This project is configured for static export, allowing deployment to GitHub Pages.

### Setup Steps:

1.  **Push to GitHub**: Ensure all your latest changes, including the ones provided for GitHub Pages deployment (updated `next.config.ts` and the new `.github/workflows/deploy.yml` file), are pushed to your GitHub repository.

2.  **Configure GitHub Pages Settings**:
    *   Go to your GitHub repository.
    *   Click on "Settings" (usually a tab at the top).
    *   In the left sidebar, navigate to "Pages".
    *   Under "Build and deployment", for the "Source" option, select **"GitHub Actions"**.
    *   GitHub Actions will now use the `.github/workflows/deploy.yml` workflow to build and deploy your site.

3.  **Trigger Deployment**:
    *   The deployment workflow will automatically run when you push to your `main` branch (or the default branch specified in the workflow file).
    *   You can also manually trigger the workflow from the "Actions" tab in your GitHub repository by selecting the "Deploy Next.js site to Pages" workflow and clicking "Run workflow".

4.  **Access Your Site**:
    *   After the workflow completes successfully, your site will be available at `https://<your-username>.github.io/<your-repository-name>/`.
    *   The URL will also be displayed in the "Pages" settings section once deployed.

### **VERY IMPORTANT: Limitations of Static Export on GitHub Pages**

GitHub Pages hosts **static** files. This means any server-side functionality in your Next.js application **WILL NOT WORK** as it does in a Node.js environment (like when you run `npm run dev` or deploy to a platform like Vercel or Firebase Hosting with Cloud Functions).

**Specifically, for this application, the following will be affected:**

*   **Server Actions**:
    *   The registration process (`src/components/auth/RegistrationFormStudent.tsx`, `src/components/auth/RegistrationFormCompany.tsx`) relies on a Server Action (`sendAdminApprovalRequestEmail` in `src/lib/actions/notificationActions.ts`) to simulate sending an email to an administrator for account approval. **This email notification will NOT be sent when deployed to GitHub Pages.** The form might submit, but the backend action will fail silently or show an error in the browser console because there's no Next.js server to handle it.
    *   Any other Server Actions for form submissions or data mutations will also fail.
*   **Genkit AI Flows**:
    *   Any Genkit flows defined (e.g., in `src/ai/flows/`) that are intended to be called from Server Actions or API routes will not function. GitHub Pages does not provide the server environment Genkit needs to execute these flows.
*   **API Routes**: If you were to add API routes (e.g., in `src/app/api/...`), they would not work.
*   **Dynamic Rendering/ISR**: Features like Incremental Static Regeneration (ISR) or fully dynamic server-rendering are not supported. Pages are pre-rendered at build time.

**What does this mean for your deployed site on GitHub Pages?**

*   The site will primarily serve as a **static UI showcase**.
*   User registration will appear to complete on the frontend, but the crucial step of notifying an admin for approval via email **will not occur**.
*   Login might seem to work due to the current client-side `localStorage` usage, but any real backend authentication would fail.
*   Any features relying on Genkit for AI capabilities will be non-functional.

For full functionality, including Server Actions and Genkit flows, you would need to deploy this application to a hosting provider that supports Node.js environments and server-side rendering (e.g., Vercel, Netlify, Firebase Hosting with Cloud Functions, a custom server).
```