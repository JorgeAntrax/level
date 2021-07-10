<h1>Documentacion de kimera CSS framework</h1>

Install pug cli

> npm install pug-cli -g

install project dependencies

> npm install

Generate html using 

> npm run pugtohtml


bazel query --noimplicit_deps 'deps(//scss:kimera)' --output graph > simplified_graph.in dot -Tpng < simplified_graph.in > graph_simplified.png
