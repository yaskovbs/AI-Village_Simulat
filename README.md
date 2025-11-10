# פרויקט React עם Vite, TypeScript ו-Shadcn/ui

פרויקט זה נוצר כתבנית בסיס ליישומי React מודרניים, תוך שימוש בכלים העדכניים ביותר.

## סקירה כללית

הפרויקט כולל:
-   **React 18** עם Hooks.
-   **Vite** כסביבת פיתוח ובנייה מהירה.
-   **TypeScript** לבדיקת טיפוסים סטטית.
-   **Shadcn/ui** כספריית רכיבי ממשק משתמש, בנויה על Tailwind CSS.
-   **Tailwind CSS** לעיצוב מהיר ומותאם אישית.
-   **`next-themes`** לניהול ערכות נושא (בהיר/כהה).
-   **ESLint** ו-**Prettier** לשמירה על איכות וסגנון קוד אחיד.

## התקנה

כדי להתקין את התלויות של הפרויקט, הרץ את הפקודה הבאה בטרמינל:

```bash
yarn install
```

## פקודות הרצה

### הרצת שרת פיתוח
כדי להפעיל את שרת הפיתוח המקומי עם Hot-Reload:

```bash
yarn dev
```

האפליקציה תהיה זמינה בכתובת `http://localhost:5173`.

### בניית הפרויקט
כדי לבנות את הפרויקט לגרסת ייצור (production):

```bash
yarn build
```

הקבצים המוכנים יווצרו בתיקיית `dist`.

### תצוגה מקדימה של גרסת הייצור
כדי להריץ תצוגה מקדימה של גרסת הייצור שנבנתה:

```bash
yarn preview
```

## מבנה הפרויקט

```
.
├── public/                  # קבצים סטטיים (כמו favicon)
├── src/
│   ├── components/          # רכיבי React לשימוש חוזר
│   │   ├── ui/              # רכיבי Shadcn/ui שהותקנו
│   │   ├── theme-provider.tsx # ספק ערכת הנושא
│   │   └── theme-toggle.tsx   # כפתור החלפת ערכת נושא
│   ├── pages/               # רכיבי עמודים ראשיים
│   │   └── AgentSettingsPage.tsx
│   ├── lib/
│   │   └── utils.ts         # פונקציות עזר (כמו cn)
│   ├── App.tsx              # הרכיב הראשי של האפליקציה
│   ├── main.tsx             # נקודת הכניסה של האפליקציה
│   └── index.css            # קובץ ה-CSS הראשי עם הגדרות Tailwind
├── index.html               # קובץ ה-HTML הראשי
├── package.json             # הגדרות הפרויקט והתלויות
├── tailwind.config.js       # קובץ התצורה של Tailwind CSS
├── vite.config.ts           # קובץ התצורה של Vite
└── tsconfig.json            # קובץ התצורה של TypeScript
```
