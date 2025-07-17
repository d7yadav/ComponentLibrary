# Tabs Component Examples

## 📚 Comprehensive Usage Examples

### 1. Basic Tab Implementation

#### Simple Text Tabs
```typescript
// Basic tab structure with text labels
const BasicTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Overview content goes here...
      </TabPanel>
      <TabPanel value={value} index={1}>
        Detailed information content...
      </TabPanel>
      <TabPanel value={value} index={2}>
        Reviews and ratings content...
      </TabPanel>
    </Box>
  );
};

// Helper function for accessibility
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
```

#### Icon Tabs
```typescript
// Tabs with icons only
<Tabs value={value} onChange={handleChange} aria-label="icon tabs">
  <Tab icon={<HomeIcon />} aria-label="home" {...a11yProps(0)} />
  <Tab icon={<FavoriteIcon />} aria-label="favorites" {...a11yProps(1)} />
  <Tab icon={<PersonIcon />} aria-label="profile" {...a11yProps(2)} />
  <Tab icon={<SettingsIcon />} aria-label="settings" {...a11yProps(3)} />
</Tabs>

// Tabs with icons and labels
<Tabs value={value} onChange={handleChange} aria-label="icon label tabs">
  <Tab icon={<DashboardIcon />} label="Dashboard" {...a11yProps(0)} />
  <Tab icon={<AnalyticsIcon />} label="Analytics" {...a11yProps(1)} />
  <Tab icon={<ReportsIcon />} label="Reports" {...a11yProps(2)} />
  <Tab icon={<SettingsIcon />} label="Settings" {...a11yProps(3)} />
</Tabs>

// Tabs with top-positioned icons
<Tabs 
  value={value} 
  onChange={handleChange} 
  aria-label="icon position tabs"
  sx={{
    '& .MuiTab-root': {
      minHeight: 72,
    }
  }}
>
  <Tab 
    icon={<CalendarTodayIcon />} 
    label="Today" 
    iconPosition="top"
    {...a11yProps(0)} 
  />
  <Tab 
    icon={<EventIcon />} 
    label="This Week" 
    iconPosition="top"
    {...a11yProps(1)} 
  />
  <Tab 
    icon={<DateRangeIcon />} 
    label="This Month" 
    iconPosition="top"
    {...a11yProps(2)} 
  />
</Tabs>
```

### 2. Advanced Tab Variants

#### Vertical Tabs
```typescript
const VerticalTabs = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        aria-label="vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Account Settings" {...a11yProps(0)} />
        <Tab label="Privacy & Security" {...a11yProps(1)} />
        <Tab label="Notifications" {...a11yProps(2)} />
        <Tab label="Billing" {...a11yProps(3)} />
        <Tab label="Support" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Account settings configuration...
      </TabPanel>
      <TabPanel value={value} index={1}>
        Privacy and security options...
      </TabPanel>
      <TabPanel value={value} index={2}>
        Notification preferences...
      </TabPanel>
      <TabPanel value={value} index={3}>
        Billing information and invoices...
      </TabPanel>
      <TabPanel value={value} index={4}>
        Support and help resources...
      </TabPanel>
    </Box>
  );
};
```

#### Scrollable Tabs
```typescript
// Horizontal scrollable tabs for many items
<Box sx={{ maxWidth: 480, bgcolor: 'background.paper' }}>
  <Tabs
    value={value}
    onChange={handleChange}
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs"
  >
    <Tab label="JavaScript" {...a11yProps(0)} />
    <Tab label="TypeScript" {...a11yProps(1)} />
    <Tab label="React" {...a11yProps(2)} />
    <Tab label="Vue.js" {...a11yProps(3)} />
    <Tab label="Angular" {...a11yProps(4)} />
    <Tab label="Node.js" {...a11yProps(5)} />
    <Tab label="Python" {...a11yProps(6)} />
    <Tab label="Java" {...a11yProps(7)} />
    <Tab label="C#" {...a11yProps(8)} />
    <Tab label="Go" {...a11yProps(9)} />
  </Tabs>
</Box>

// Force scrollable tabs
<Tabs
  value={value}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons={true}
  allowScrollButtonsMobile
  aria-label="scrollable force tabs"
>
  <Tab label="Active Projects" {...a11yProps(0)} />
  <Tab label="Completed" {...a11yProps(1)} />
  <Tab label="On Hold" {...a11yProps(2)} />
  <Tab label="Cancelled" {...a11yProps(3)} />
</Tabs>
```

#### Full Width Tabs
```typescript
// Full width tabs that fill container
<Paper sx={{ width: '100%' }}>
  <Tabs
    value={value}
    onChange={handleChange}
    variant="fullWidth"
    aria-label="full width tabs"
    sx={{
      backgroundColor: 'primary.main',
      '& .MuiTab-root': {
        color: 'primary.contrastText',
        '&.Mui-selected': {
          color: 'primary.contrastText',
          backgroundColor: 'primary.dark',
        }
      },
      '& .MuiTabs-indicator': {
        backgroundColor: 'primary.contrastText',
      }
    }}
  >
    <Tab label="Dashboard" {...a11yProps(0)} />
    <Tab label="Analytics" {...a11yProps(1)} />
    <Tab label="Reports" {...a11yProps(2)} />
  </Tabs>
</Paper>
```

### 3. Styled Tab Variations

#### Pills/Rounded Tabs
```typescript
// Pill-style tabs with rounded corners
<Tabs 
  value={value} 
  onChange={handleChange}
  aria-label="pill tabs"
  sx={{
    backgroundColor: 'grey.100',
    borderRadius: 2,
    p: 0.5,
    '& .MuiTab-root': {
      borderRadius: 1.5,
      textTransform: 'none',
      minHeight: 40,
      margin: '0 2px',
      '&.Mui-selected': {
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        boxShadow: 1,
      }
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    }
  }}
>
  <Tab label="Overview" {...a11yProps(0)} />
  <Tab label="Features" {...a11yProps(1)} />
  <Tab label="Pricing" {...a11yProps(2)} />
  <Tab label="Support" {...a11yProps(3)} />
</Tabs>

// Outlined pill tabs
<Tabs 
  value={value} 
  onChange={handleChange}
  aria-label="outlined pill tabs"
  sx={{
    '& .MuiTab-root': {
      borderRadius: 20,
      border: '1px solid',
      borderColor: 'divider',
      textTransform: 'none',
      minHeight: 36,
      margin: '0 4px',
      '&.Mui-selected': {
        borderColor: 'primary.main',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    }
  }}
>
  <Tab label="All" {...a11yProps(0)} />
  <Tab label="Active" {...a11yProps(1)} />
  <Tab label="Completed" {...a11yProps(2)} />
  <Tab label="Archived" {...a11yProps(3)} />
</Tabs>
```

#### Card-Style Tabs
```typescript
// Tabs styled as cards
<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
  {['Summary', 'Details', 'History'].map((label, index) => (
    <Card 
      key={label}
      sx={{ 
        cursor: 'pointer',
        border: value === index ? 2 : 1,
        borderColor: value === index ? 'primary.main' : 'divider',
        backgroundColor: value === index ? 'primary.light' : 'background.paper',
        '&:hover': {
          borderColor: 'primary.main',
        }
      }}
      onClick={() => setValue(index)}
    >
      <CardContent sx={{ py: 1.5, px: 2 }}>
        <Typography 
          variant="body2" 
          color={value === index ? 'primary.main' : 'text.primary'}
          fontWeight={value === index ? 'medium' : 'regular'}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  ))}
</Box>
```

### 4. Content-Rich Tab Examples

#### Tabs with Badges and Counters
```typescript
// Tabs with notification badges
<Tabs value={value} onChange={handleChange} aria-label="tabs with badges">
  <Tab 
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        Inbox
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </Box>
    } 
    {...a11yProps(0)} 
  />
  <Tab 
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        Tasks
        <Chip label="12" size="small" color="primary" />
      </Box>
    } 
    {...a11yProps(1)} 
  />
  <Tab 
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        Calendar
        <Chip label="3 today" size="small" variant="outlined" />
      </Box>
    } 
    {...a11yProps(2)} 
  />
</Tabs>

// Tabs with status indicators
<Tabs value={value} onChange={handleChange} aria-label="status tabs">
  <Tab 
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Circle sx={{ fontSize: 8, color: 'success.main' }} />
        All Services
      </Box>
    } 
    {...a11yProps(0)} 
  />
  <Tab 
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Circle sx={{ fontSize: 8, color: 'warning.main' }} />
        Issues (2)
      </Box>
    } 
    {...a11yProps(1)} 
  />
  <Tab 
    label={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Circle sx={{ fontSize: 8, color: 'error.main' }} />
        Critical (1)
      </Box>
    } 
    {...a11yProps(2)} 
  />
</Tabs>
```

#### Complex Tab Content
```typescript
// Rich content within tabs
const DashboardTabs = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(e, v) => setValue(v)}>
        <Tab 
          label={
            <Box sx={{ textAlign: 'left', minWidth: 120 }}>
              <Typography variant="body2" fontWeight="medium">
                Analytics
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last 30 days
              </Typography>
            </Box>
          } 
          {...a11yProps(0)} 
        />
        <Tab 
          label={
            <Box sx={{ textAlign: 'left', minWidth: 120 }}>
              <Typography variant="body2" fontWeight="medium">
                Performance
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Real-time data
              </Typography>
            </Box>
          } 
          {...a11yProps(1)} 
        />
        <Tab 
          label={
            <Box sx={{ textAlign: 'left', minWidth: 120 }}>
              <Typography variant="body2" fontWeight="medium">
                Reports
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Export ready
              </Typography>
            </Box>
          } 
          {...a11yProps(2)} 
        />
      </Tabs>
      
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                User Engagement
              </Typography>
              {/* Chart component */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Revenue Trends
              </Typography>
              {/* Chart component */}
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};
```

### 5. Mobile-Optimized Tabs

#### Responsive Tab Design
```typescript
// Responsive tabs that adapt to screen size
<Box sx={{ width: '100%' }}>
  <Tabs
    value={value}
    onChange={handleChange}
    variant="scrollable"
    scrollButtons="auto"
    allowScrollButtonsMobile
    aria-label="responsive tabs"
    sx={{
      '& .MuiTab-root': {
        minWidth: { xs: 90, sm: 120 },
        fontSize: { xs: '0.875rem', sm: '1rem' },
      }
    }}
  >
    <Tab label="Dashboard" {...a11yProps(0)} />
    <Tab label="Analytics" {...a11yProps(1)} />
    <Tab label="Reports" {...a11yProps(2)} />
    <Tab label="Settings" {...a11yProps(3)} />
    <Tab label="Help" {...a11yProps(4)} />
  </Tabs>
</Box>

// Mobile-first icon tabs with labels on hover
<Tabs 
  value={value} 
  onChange={handleChange}
  aria-label="mobile optimized tabs"
  sx={{
    '& .MuiTab-root': {
      minWidth: { xs: 48, sm: 120 },
      '& .MuiTab-iconWrapper': {
        marginBottom: { xs: 0, sm: 0.5 },
      }
    }
  }}
>
  <Tab 
    icon={<HomeIcon />} 
    label={
      <Typography 
        variant="caption" 
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Home
      </Typography>
    } 
    {...a11yProps(0)} 
  />
  <Tab 
    icon={<SearchIcon />} 
    label={
      <Typography 
        variant="caption" 
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Search
      </Typography>
    } 
    {...a11yProps(1)} 
  />
  <Tab 
    icon={<FavoriteIcon />} 
    label={
      <Typography 
        variant="caption" 
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Favorites
      </Typography>
    } 
    {...a11yProps(2)} 
  />
</Tabs>
```

### 6. Accessibility-Enhanced Examples

#### Enhanced Screen Reader Support
```typescript
// Comprehensive accessibility features
<Box role="application" aria-label="Content navigation">
  <Tabs
    value={value}
    onChange={handleChange}
    aria-label="Content sections"
    aria-describedby="tabs-description"
  >
    <Tab 
      label="Article Content" 
      aria-controls="panel-0"
      aria-selected={value === 0}
      {...a11yProps(0)} 
    />
    <Tab 
      label="Author Information" 
      aria-controls="panel-1"
      aria-selected={value === 1}
      {...a11yProps(1)} 
    />
    <Tab 
      label="Related Articles" 
      aria-controls="panel-2"
      aria-selected={value === 2}
      {...a11yProps(2)} 
    />
  </Tabs>
  
  <Typography 
    id="tabs-description" 
    variant="body2" 
    color="text.secondary"
    sx={{ mb: 2, px: 2 }}
  >
    Use arrow keys to navigate between tabs
  </Typography>

  <div 
    role="tabpanel" 
    id="panel-0"
    aria-labelledby="simple-tab-0"
    hidden={value !== 0}
  >
    {value === 0 && (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Article Content
        </Typography>
        <Typography variant="body1">
          Main article content goes here...
        </Typography>
      </Box>
    )}
  </div>
</Box>
```

#### Keyboard Navigation Enhancement
```typescript
// Enhanced keyboard support
<Tabs
  value={value}
  onChange={handleChange}
  aria-label="keyboard enhanced tabs"
  onKeyDown={(event) => {
    if (event.key === 'Home') {
      setValue(0);
      event.preventDefault();
    } else if (event.key === 'End') {
      setValue(tabs.length - 1);
      event.preventDefault();
    }
  }}
  sx={{
    '& .MuiTab-root': {
      '&:focus': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      }
    }
  }}
>
  <Tab label="First Tab" {...a11yProps(0)} />
  <Tab label="Second Tab" {...a11yProps(1)} />
  <Tab label="Third Tab" {...a11yProps(2)} />
</Tabs>
```

### 7. Advanced Integration Examples

#### Tabs with Lazy Loading
```typescript
// Lazy-loaded tab content
const LazyTabs = () => {
  const [value, setValue] = useState(0);
  const [loadedTabs, setLoadedTabs] = useState(new Set([0]));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setLoadedTabs(prev => new Set([...prev, newValue]));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Immediate" {...a11yProps(0)} />
        <Tab label="Lazy Content" {...a11yProps(1)} />
        <Tab label="Heavy Component" {...a11yProps(2)} />
      </Tabs>
      
      <TabPanel value={value} index={0}>
        Always loaded content
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        {loadedTabs.has(1) ? (
          <LazyComponent />
        ) : (
          <Skeleton variant="rectangular" height={200} />
        )}
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        {loadedTabs.has(2) ? (
          <HeavyComponent />
        ) : (
          <CircularProgress />
        )}
      </TabPanel>
    </Box>
  );
};
```

#### Tabs with URL Routing
```typescript
// URL-synced tabs with React Router
const RoutedTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabRoutes = [
    { path: '/dashboard/overview', label: 'Overview' },
    { path: '/dashboard/analytics', label: 'Analytics' },
    { path: '/dashboard/reports', label: 'Reports' },
  ];
  
  const currentTab = tabRoutes.findIndex(route => 
    location.pathname === route.path
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(tabRoutes[newValue].path);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs 
        value={currentTab >= 0 ? currentTab : 0} 
        onChange={handleTabChange}
        aria-label="dashboard navigation"
      >
        {tabRoutes.map((route, index) => (
          <Tab 
            key={route.path}
            label={route.label} 
            component={Link}
            to={route.path}
            {...a11yProps(index)} 
          />
        ))}
      </Tabs>
      
      <Routes>
        <Route path="/dashboard/overview" element={<OverviewContent />} />
        <Route path="/dashboard/analytics" element={<AnalyticsContent />} />
        <Route path="/dashboard/reports" element={<ReportsContent />} />
      </Routes>
    </Box>
  );
};
```

These examples demonstrate the flexibility and power of the Tabs component, showing how to create accessible, responsive, and visually appealing tabbed interfaces for various use cases.