
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8dcab3b8-4bb7-4571-96f1-e6c60beb3a41

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8dcab3b8-4bb7-4571-96f1-e6c60beb3a41) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Deploy to Hostinger - UPDATED INSTRUCTIONS

### Automatinis deployment su GitHub integration

1. **Hostinger GitHub integracija:**
   - Hostinger valdymo skydelyje eikite į **Git Deployment**
   - Pasirinkite savo GitHub repository
   - **Branch:** `main`
   - **Build Command:** `npm ci && npm run build`
   - **Output Directory:** `dist`
   - **Install Path:** palikite tuščią (deploy'ins į `/public_html`)

2. **Jei automatinis deployment neveikia:**
   
   **Variantas A - Manual build ir upload:**
   ```bash
   # Lokaliai
   npm install
   npm run build
   
   # Upload visus failus iš 'dist' aplanko į Hostinger public_html
   ```

   **Variantas B - Separate deployment branch:**
   ```bash
   # Sukurti deploy branch
   git checkout --orphan deploy
   git rm -rf .
   
   # Build projektas main branch'e ir nukopijuoti
   git checkout main
   npm run build
   cp -r dist/* ../temp-deploy/
   
   # Grįžti į deploy branch ir commit
   git checkout deploy
   cp -r ../temp-deploy/* ./
   git add .
   git commit -m "Deploy build"
   git push -f origin deploy
   
   # Hostinger nustatymuose nurodyti 'deploy' branch
   ```

3. **Svarbu - Node.js versija:**
   - Hostinger valdymo skydelyje įsitikinkite, kad **Node.js versija** yra bent 16 arba naujesnė
   - Eikite į **Advanced → Node.js Selector** ir pasirinkite Node.js 18 ar naujesnę

4. **Troubleshooting:**
   - Jei deployment ieško PHP failų (`composer.json`), tai reiškia, kad Hostinger neteisingai identifikavo projekto tipą
   - Įsitikinkite, kad projekto šaknies kataloge yra `.hostinger.yml` failas
   - Patikrinkite, kad **Git Deployment** nustatymuose pasirinktas teisingas repository ir branch

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- MindAR.js for AR functionality

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8dcab3b8-4bb7-4571-96f1-e6c60beb3a41) and click on Share → Publish.

For Hostinger deployment, follow the updated steps above in the "Deploy to Hostinger" section.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
