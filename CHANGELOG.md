## 1.1.2

### Fixes

- Fixed error on compare when comparing IVersion values.

### New Features

- Version object has compare method.

```typescript
const version = parse("1.2.3");

// returns "equal"
version.compare(parse("1.2.3.0"));
```

- **isVersion** method logic change. Now requires major and minor to be a number, while patch and build should be a number or null.

### <span style="color: red; font-weight: bold;">!! BREAKING CHANGES</span>

- **compare** method is removed in the export.
