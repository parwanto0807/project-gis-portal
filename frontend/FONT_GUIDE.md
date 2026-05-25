# Font Usage Guide - GIS ERP Portal

## 📝 Font Stack

### Primary Font: **Inter**
- **Usage**: All UI text, labels, headings, paragraphs
- **Why**: Excellent readability, modern, optimized for screens
- **Class**: Default (no class needed)

### Monospace Font: **Geist Mono**
- **Usage**: Numbers, prices, codes, data tables
- **Why**: Fixed-width ensures perfect alignment for tabular data
- **Class**: `font-mono`

## 🎯 Usage Examples

### ✅ Use Inter (Default)
```tsx
// Headings
<h1 className="text-2xl font-bold">Dashboard</h1>

// Labels
<Label>Customer Name</Label>

// Paragraphs
<p className="text-gray-600">Description text here</p>
```

### ✅ Use Geist Mono (font-mono)
```tsx
// Prices & Currency
<span className="font-mono">Rp 1,234,567.00</span>

// Invoice Numbers
<span className="font-mono">INV-2024-001</span>

// Quantities
<td className="font-mono text-right">1,250</td>

// Dates (optional, for consistency)
<span className="font-mono">2024-01-08</span>

// Table with numbers
<Table>
  <TableBody>
    <TableRow>
      <TableCell>Product A</TableCell>
      <TableCell className="font-mono text-right">1,250</TableCell>
      <TableCell className="font-mono text-right">Rp 50,000</TableCell>
      <TableCell className="font-mono text-right">Rp 62,500,000</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## 🎨 Font Weights

Inter supports these weights:
- `font-thin` (100)
- `font-extralight` (200)
- `font-light` (300)
- `font-normal` (400) - Default
- `font-medium` (500) - Recommended for labels
- `font-semibold` (600) - Recommended for headings
- `font-bold` (700) - For emphasis
- `font-extrabold` (800)
- `font-black` (900)

## 💡 Best Practices

1. **Always use `font-mono` for financial data** to ensure proper alignment
2. **Use `text-right` with `font-mono`** for number columns in tables
3. **Use `font-semibold` or `font-bold`** for important headings
4. **Use `font-medium`** for labels and form fields
5. **Keep body text at `font-normal`** for readability

## 📊 Example: Financial Table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead className="text-right">Qty</TableHead>
      <TableHead className="text-right">Price</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Product Name</TableCell>
      <TableCell className="font-mono text-right">1,250</TableCell>
      <TableCell className="font-mono text-right">Rp 50,000</TableCell>
      <TableCell className="font-mono text-right font-semibold">Rp 62,500,000</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## 🔧 Technical Details

- **Inter**: Loaded from Google Fonts via Next.js font optimization
- **Geist Mono**: Loaded from `geist` package
- **CSS Variables**: 
  - `--font-inter` for Inter
  - `--font-geist-mono` for Geist Mono
- **Tailwind Classes**:
  - `font-sans` → Inter
  - `font-mono` → Geist Mono
