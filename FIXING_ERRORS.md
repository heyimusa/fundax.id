# Fixing Setup Errors

## Quick Fix Steps

### 1. Install Dependencies (REQUIRED FIRST!)

The TypeScript errors you're seeing are because dependencies aren't installed yet. Run these commands:

#### Main Frontend
```bash
# In the root directory (fundax.id/)
npm install
```

#### Admin Dashboard
```bash
cd admin-dashboard
npm install
cd ..
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Restart TypeScript Server

After installing dependencies, restart your IDE's TypeScript server:

**VS Code / Cursor:**
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "TypeScript: Restart TS Server"
- Press Enter

**Or simply restart your IDE.**

### 3. Setup Environment Files

Create `.env` file in the root directory:
```bash
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
```

### 4. Verify Fixed Errors

After the above steps, the TypeScript errors should be gone. If you still see errors:

1. **Clear TypeScript cache:**
   ```bash
   # In root directory
   rm -rf node_modules/.vite
   ```

2. **Reinstall node_modules:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Restart IDE completely**

## Explanation of Errors

### "Cannot find module 'react'"
- **Cause**: node_modules not installed
- **Fix**: Run `npm install` in both root and admin-dashboard directories

### "Cannot find module '@tanstack/react-query'"
- **Cause**: Dependencies not installed in admin-dashboard
- **Fix**: Run `npm install` in admin-dashboard directory

### "Property 'env' does not exist on type 'ImportMeta'"
- **Cause**: TypeScript server hasn't picked up vite-env.d.ts changes
- **Fix**: Restart TypeScript server

### Admin Dashboard JSX Errors
- **Cause**: React types not installed
- **Fix**: Run `npm install` in admin-dashboard, then restart TS server

## Complete Setup Checklist

Run these commands in order:

```bash
# 1. Main Frontend Dependencies
npm install

# 2. Admin Dashboard Dependencies
cd admin-dashboard
npm install
cd ..

# 3. Backend Dependencies
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..

# 4. Create environment file
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
echo "VITE_API_BASE_URL=http://localhost:8000" > admin-dashboard/.env

# 5. Restart your IDE or TypeScript server
```

## Starting the System

After fixing errors, start each component:

### Terminal 1 - Backend
```bash
cd backend
docker-compose up -d
# Or without Docker:
# source venv/bin/activate
# uvicorn main:app --reload
```

### Terminal 2 - Initialize Database (First time only)
```bash
cd backend
python scripts/init_db.py
```

### Terminal 3 - Admin Dashboard
```bash
cd admin-dashboard
npm run dev
```

### Terminal 4 - Main Frontend
```bash
# In root directory
npm run dev
```

## Still Having Issues?

### Error: "Port already in use"
Different port is being used. Change in:
- Backend: `docker-compose.yml` (change port 8000)
- Admin: `admin-dashboard/vite.config.ts` (change port 3000)
- Frontend: `vite.config.ts` (change port 5173)

### Error: "Database connection failed"
1. Ensure PostgreSQL is running: `docker-compose ps`
2. Check credentials in `backend/.env`
3. Restart: `docker-compose restart`

### Error: "Module not found" after install
1. Delete node_modules: `rm -rf node_modules`
2. Delete package-lock.json: `rm package-lock.json`
3. Reinstall: `npm install`
4. Restart IDE

### TypeScript Still Showing Errors
1. Close all files in IDE
2. Run: `npx tsc --noEmit` to see real errors
3. If no errors from CLI, it's an IDE cache issue
4. Restart IDE completely

## Verification

After setup, verify everything works:

1. **Backend**: Visit http://localhost:8000/docs - Should see API documentation
2. **Admin**: Visit http://localhost:3000 - Should see login page
3. **Frontend**: Visit http://localhost:5173 - Should see main website
4. **No TS Errors**: Open `src/pages/Ajukan.tsx` - Should have no red underlines

## Common Mistakes

❌ **Don't do this:**
- Running backend without installing Python dependencies
- Starting admin dashboard without npm install
- Forgetting to create .env files
- Not restarting TypeScript server after changes

✅ **Do this:**
- Install all dependencies first
- Create .env files
- Restart TypeScript server after dependency changes
- Use Docker for easier backend setup

## Need More Help?

1. Check `QUICK_START.md` for setup instructions
2. Check `IMPLEMENTATION_SUMMARY.md` for architecture details
3. Ensure all prerequisites are installed:
   - Node.js 18+
   - Python 3.11+
   - PostgreSQL 15+ (or use Docker)
   - Docker & Docker Compose (optional but recommended)

