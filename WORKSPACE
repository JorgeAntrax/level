####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(name = "kimera")

####################################
# The Bazel buildtools repo contains tools like the BUILD file formatter, buildifier
#http_archive(
#    name = "com_github_bazelbuild_buildtools",
#    sha256 = "dad19224258ed67cbdbae9b7befb785c3b966e5a33b04b3ce58ddb7824b97d73",
#    strip_prefix = "buildtools-b3b620e8bcff18ed3378cd3f35ebeb7016d71f71",
# Note, this commit matches the version of buildifier in angular/ngcontainer
#    url = "https://github.com/bazelbuild/buildtools/archive/b3b620e8bcff18ed3378cd3f35ebeb7016d71f71.zip",
#)

git_repository(
    name = "com_github_bazelbuild_buildtools",
    remote = "https://github.com/bazelbuild/buildtools.git",
    tag = "0.11.1",
)

####################################
# Fetch and install the NodeJS rules
#http_archive
#url = "https://github.com/bazelbuild/rules_nodejs/archive/0.4.1.zip",
#strip_prefix = "rules_nodejs-0.4.1",
#sha256 = "e9bc013417272b17f302dc169ad597f05561bb277451f010043f4da493417607",
git_repository(
    name = "build_bazel_rules_nodejs",
    remote = "https://github.com/bazelbuild/rules_nodejs.git",
    tag = "0.7.0",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")

node_repositories(package_json = ["//:package.json"])

####################################
# Fetch and install the Sass rules
git_repository(
    name = "io_bazel_rules_sass",
    remote = "https://github.com/bazelbuild/rules_sass.git",
    tag = "0.0.3",
)

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_repositories")

sass_repositories()

####################################
# Fetch and install the TypeScript rules
git_repository(
    name = "build_bazel_rules_typescript",
    remote = "https://github.com/bazelbuild/rules_typescript.git",
    tag = "0.7.1",
)

load("@build_bazel_rules_typescript//:setup.bzl", "ts_setup_workspace")

ts_setup_workspace(default_tsconfig = "@kimera//:tsconfig.json")

#load('@bazel_tools//tools/build_defs/pkg:pkg.bzl', 'pkg_tar', 'pkg_deb')

#load("@//tools/build_rules:java_rules_skylark.bzl", "bootstrap_java_library")

####################################
# Tell Bazel about some workspaces that were installed from npm.
# Include @bazel/typescript in package.json#devDependencies
#local_repository(
#    name = "build_bazel_rules_typescript",
#    path = "node_modules/@bazel/typescript",
#)
#local_repository(
#    name = "angular",
#    path = "node_modules/@angular/bazel",
#)
