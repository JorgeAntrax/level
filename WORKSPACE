####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(name = "kimera")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

#http_archive(
#    name = "bazel_skylib",
#    sha256 = "95518adafc9a2b656667bbf517a952e54ce7f350779d0dd95133db4eb5c27fb1",
#    strip_prefix = "bazel-skylib-0.3.1",
#    url = "https://github.com/bazelbuild/bazel-skylib/archive/0.3.1.zip",
#)
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
    tag = "0.19.2.1",
)

git_repository(
    name = "build_bazel_rules_nodejs",
    remote = "https://github.com/bazelbuild/rules_nodejs.git",
    tag = "0.16.3",
)

load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dependencies")

rules_nodejs_dependencies()

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")

#node_repositories(package_json = ["//:package.json"])

node_repositories(
    node_version = "10.9.0",
    package_json = ["//:package.json"],
    #    yarn_version = "1.12.1",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")

node_repositories()

####################################
# Fetch and install the Sass rules
#git_repository(
#    name = "io_bazel_rules_sass",
#    remote = "https://github.com/bazelbuild/rules_sass.git",
#    tag = "1.15.1.",
#)
http_archive(
    name = "io_bazel_rules_sass",
    strip_prefix = "rules_sass-1.15.1",
    url = "https://github.com/bazelbuild/rules_sass/archive/1.15.1.zip",
)

load("@io_bazel_rules_sass//:defs.bzl", "sass_repositories")

#load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")
load("@io_bazel_rules_sass//:package.bzl", "rules_sass_dependencies")

rules_sass_dependencies()

sass_repositories()

####################################
# Fetch and install the TypeScript rules
git_repository(
    name = "build_bazel_rules_typescript",
    remote = "https://github.com/bazelbuild/rules_typescript.git",
    #    tag = "0.7.1",
    tag = "0.22.0",
)

#load("@build_bazel_rules_typescript//:setup.bzl", "ts_setup_workspace")

load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")

rules_typescript_dependencies()

load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dependencies")

rules_nodejs_dependencies()

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

ts_setup_workspace()

#ts_setup_workspace(default_tsconfig = "@kimera//:tsconfig.json")

#load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")
#
#node_repositories()

#load('@bazel_tools//tools/build_defs/pkg:pkg.bzl', 'pkg_tar', 'pkg_deb')

#load("@//tools/build_rules:java_rules_skylark.bzl", "bootstrap_java_library")

#load("@build_bazel_rules_nodejs//:defs.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

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
