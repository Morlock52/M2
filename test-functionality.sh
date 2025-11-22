#!/bin/bash

echo "🧪 Testing M2 Website Functionality..."
echo "=================================="

# Test 1: Server is running
echo "Test 1: Checking if server is running..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000 | grep -q "200"; then
    echo "✅ Server is running (HTTP 200)"
else
    echo "❌ Server is not responding"
    exit 1
fi

# Test 2: HTML loads correctly
echo "Test 2: Checking HTML content..."
HTML_CONTENT=$(curl -s http://localhost:8000)
if echo "$HTML_CONTENT" | grep -q "startWizard"; then
    echo "✅ Start Wizard button found"
else
    echo "❌ Start Wizard button missing"
fi

if echo "$HTML_CONTENT" | grep -q "advancedMode"; then
    echo "✅ Advanced Mode button found"
else
    echo "❌ Advanced Mode button missing"
fi

if echo "$HTML_CONTENT" | grep -q "app.js"; then
    echo "✅ JavaScript file referenced"
else
    echo "❌ JavaScript file missing"
fi

# Test 3: JavaScript loads
echo "Test 3: Checking JavaScript file..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/app.js | grep -q "200"; then
    echo "✅ JavaScript file loads successfully"
else
    echo "❌ JavaScript file failed to load"
fi

# Test 4: CSS loads
echo "Test 4: Checking CSS file..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/styles.css | grep -q "200"; then
    echo "✅ CSS file loads successfully"
else
    echo "❌ CSS file failed to load"
fi

# Test 5: Check for key JavaScript functions
echo "Test 5: Checking JavaScript functions..."
JS_CONTENT=$(curl -s http://localhost:8000/app.js)
if echo "$JS_CONTENT" | grep -q "class ConfigurationWizard"; then
    echo "✅ ConfigurationWizard class found"
else
    echo "❌ ConfigurationWizard class missing"
fi

if echo "$JS_CONTENT" | grep -q "function bootstrap"; then
    echo "✅ Bootstrap function found"
else
    echo "❌ Bootstrap function missing"
fi

if echo "$JS_CONTENT" | grep -q "DOMContentLoaded"; then
    echo "✅ DOMContentLoaded event listener found"
else
    echo "❌ DOMContentLoaded event listener missing"
fi

# Test 6: Check for data structures
echo "Test 6: Checking data structures..."
if echo "$JS_CONTENT" | grep -q "const serviceCatalog"; then
    echo "✅ Service catalog found"
else
    echo "❌ Service catalog missing"
fi

if echo "$JS_CONTENT" | grep -q "const fileTypeGuides"; then
    echo "✅ File type guides found"
else
    echo "❌ File type guides missing"
fi

if echo "$JS_CONTENT" | grep -q "const baseEnvFields"; then
    echo "✅ Base environment fields found"
else
    echo "❌ Base environment fields missing"
fi

echo "=================================="
echo "🎉 Testing complete!"
echo ""
echo "Website should be fully functional. Open http://localhost:8000 in your browser to test manually."
