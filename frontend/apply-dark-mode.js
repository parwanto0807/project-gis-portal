const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/admin/hr/discipline/page.tsx',
  'app/admin/hr/employees/page.tsx',
  'app/admin/audit/temuan/page.tsx',
  'app/admin/users/page.tsx',
  'app/admin/products/page.tsx',
  'app/admin/dashboard/page.tsx'
];

const mappings = {
  // Use string replace logic to bypass tricky regex boundaries
  'bg-slate-50/80': 'bg-slate-50/80 dark:bg-slate-900/80',
  'bg-slate-50/50': 'bg-slate-50/50 dark:bg-slate-900/50',
  'bg-slate-50': 'bg-slate-50 dark:bg-slate-900',
  'bg-slate-100': 'bg-slate-100 dark:bg-slate-800',
  'bg-slate-200': 'bg-slate-200 dark:bg-slate-800',
  'bg-slate-900': 'bg-slate-900 dark:bg-slate-100',
  'text-slate-900': 'text-slate-900 dark:text-slate-50',
  'text-slate-800': 'text-slate-800 dark:text-slate-200',
  'text-slate-700': 'text-slate-700 dark:text-slate-300',
  'text-slate-600': 'text-slate-600 dark:text-slate-400',
  'text-slate-500': 'text-slate-500 dark:text-slate-400',
  'border-slate-200': 'border-slate-200 dark:border-slate-800',
  'border-slate-300': 'border-slate-300 dark:border-slate-700',
  'bg-white': 'bg-white dark:bg-slate-950',
  'bg-indigo-50/50': 'bg-indigo-50/50 dark:bg-indigo-950/40',
  'bg-indigo-50': 'bg-indigo-50 dark:bg-indigo-950/40',
  'border-indigo-100': 'border-indigo-100 dark:border-indigo-900/50',
  'text-indigo-900': 'text-indigo-900 dark:text-indigo-100',
  'bg-indigo-500': 'bg-indigo-500 dark:bg-indigo-600'
};

for (const file of filesToUpdate) {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.log('Not found:', file);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  
  for (const [key, value] of Object.entries(mappings)) {
    // Only replace if not preceded by 'dark:' and not followed by a dash (so bg-slate-50 doesn't match bg-slate-500)
    // We split and map to handle instances safely
    const regex = new RegExp(`(?<!dark:)\\b${key.replace(/\//g, '\\/')}(?![\\w\\/\\-])`, 'g');
    content = content.replace(regex, value);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated:', file);
  } else {
    console.log('No changes needed:', file);
  }
}
