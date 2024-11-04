expo run:android &

while ! adb shell pm list packages | grep -q "com.my.app"; do
    sleep 3
done

echo "App is installed"