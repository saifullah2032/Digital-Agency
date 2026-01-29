# 🚀 COPY-PASTE COMMANDS TO START NOW

## All Terminal Commands in One Place

### Command 1: Open Terminal/PowerShell
```
Right-click desktop → Open PowerShell or Command Prompt
```

### Command 2: Clear Port 5000 (If Needed)
```
netstat -ano | findstr :5000
```
If result shows a PID (like 12345), run:
```
taskkill /PID 12345 /F
```

---

## Terminal 1: Start Backend

Copy and paste this entire block into PowerShell:

```powershell
cd "C:\Users\rayan\Downloads\Digital Agency\backend"
npm run dev
```

✅ Wait for this message (then keep terminal open):
```
╔════════════════════════════════════════════════════════════╗
║     Digital Agency Backend Server Running                 ║
║     Server: http://localhost:5000                        ║
║     Environment: development                             ║
╚════════════════════════════════════════════════════════════╝
```

---

## Terminal 2: Start Frontend

Open a NEW PowerShell window, then copy and paste:

```powershell
cd "C:\Users\rayan\Downloads\Digital Agency\frontend"
npm run dev
```

✅ Wait for this message (then keep terminal open):
```
  VITE v4.5.14  ready in XXX ms

  ➜  Local:   http://127.0.0.1:5173/
```

---

## Browser: Open Application

Click or copy-paste these into your browser:

### Landing Page:
```
http://localhost:5173
```

### Admin Panel:
```
http://localhost:5173/admin
```
Password: `admin123`

---

## That's It! 🎉

Both terminals should be running and showing "ready" messages.

Your application is live at http://localhost:5173
