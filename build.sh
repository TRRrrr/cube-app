grunt concat
grunt less

if [ ! -d release ]; then
	mkdir release
fi

cp src/*.html release/
cp -r src/dist release/
cp -r src/img release/
cp -r src/lib release/
cp -r src/template/*.html release/
