grunt concat
grunt less

mkdir release
cp src/*.html release/
cp -r src/dist release/
cp -r src/img release/
cp -r src/lib release/
cp -r src/template/*.html release/
