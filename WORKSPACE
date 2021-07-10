####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(
  name = "kimera",
  managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

#http_archive(
#    name = "bazel_skylib",
#    sha256 = "95518adafc9a2b656667bbf517a952e54ce7f350779d0dd95133db4eb5c27fb1",
#    strip_prefix = "bazel-skylib-0.3.1",
#    url = "https://github.com/bazelbuild/bazel-skylib/archive/0.3.1.zip",
#)
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "bazel_skylib",
    urls = [
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.0.3/bazel-skylib-1.0.3.tar.gz",
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.0.3/bazel-skylib-1.0.3.tar.gz",
    ],
    sha256 = "1c531376ac7e5a180e0237938a2536de0c54d93f5c278634818e0efc952dd56c",
)
load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")
bazel_skylib_workspace()
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
    tag = "3.3.0",
)

#git_repository(
#    name = "build_bazel_rules_nodejs",
#    remote = "https://github.com/bazelbuild/rules_nodejs.git",
#    tag = "3.7.0",
#)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "8f5f192ba02319254aaf2cdcca00ec12eaafeb979a80a1e946773c520ae0a2c9",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/3.7.0/rules_nodejs-3.7.0.tar.gz"],
)

#load("@build_bazel_rules_nodejs//:index.bzl", "check_bazel_version")

#check_bazel_version("2.1.0")

load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dev_dependencies")

rules_nodejs_dev_dependencies()

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories")

#node_repositories(package_json = ["//:package.json"])

node_repositories(
    #node_version = "12.13.0",
    package_json = ["//:package.json"],
    #    yarn_version = "1.19.1",
)

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories()

####################################
# Fetch and install the Sass rules
#git_repository(
#    name = "io_bazel_rules_sass",
#    remote = "https://github.com/bazelbuild/rules_sass.git",
#    tag = "1.35.2",
#)

http_archive(
    name = "io_bazel_rules_sass",
    # Make sure to check for the latest version when you install
    url = "https://github.com/bazelbuild/rules_sass/archive/1.26.3.zip",
    strip_prefix = "rules_sass-1.26.3",
    sha256 = "9dcfba04e4af896626f4760d866f895ea4291bc30bf7287887cefcf4707b6a62",
)

#load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")
load("@io_bazel_rules_sass//:package.bzl", "rules_sass_dependencies")
rules_sass_dependencies()

load("@io_bazel_rules_sass//:defs.bzl", "sass_repositories")
sass_repositories()

####################################
# Fetch and install the TypeScript rules
#git_repository(
#    name = "build_bazel_rules_typescript",
#    remote = "https://github.com/bazelbuild/rules_typescript.git",
    #    tag = "0.7.1",
#    tag = "0.25.1",
#)

#load("@build_bazel_rules_typescript//:setup.bzl", "ts_setup_workspace")
#load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
#ts_setup_workspace()

#load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")

#rules_typescript_dependencies()

#load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dev_dependencies")

#rules_nodejs_dev_dependencies()

#load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")

#ts_setup_workspace()

#ts_setup_workspace(default_tsconfig = "@kimera//:tsconfig.json")

#load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")
#
#node_repositories()

#load('@bazel_tools//tools/build_defs/pkg:pkg.bzl', 'pkg_tar', 'pkg_deb')

#load("@//tools/build_rules:java_rules_skylark.bzl", "bootstrap_java_library")

#load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

yarn_install(
    name = "npm",
    exports_directories_only = True,
    package_json = "//:package.json",
    strict_visibility = True,
    yarn_lock = "//:yarn.lock",
)

#load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
#load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
#install_bazel_dependencies()
#load("@npm//typescript:index.bzl", "tsc")
#deps = ["@npm//@types/node"]
#load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
#ts_setup_workspace()
#tsc(
#    name = "main_lib",
#    outs = [
#        "main.js",
#    ],
#    args = [
#        "-p",
#        "$(execpath tsconfig.json)",
#        "--outDir",
#        # $(RULEDIR) is a shorthand for the dist/bin directory where Bazel requires we write outputs
#        "$(RULEDIR)",
#    ],
#    data = [
#        "main.ts",
#        "tsconfig.json",
#    ],
#)

#load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")
#load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
#load("@npm//@bazel/typescript:index.bzl", "ts_setup_workspace")
#ts_setup_workspace()

#load("@npm_bazel_typescript//:defs.bzl", "ts_setup_workspace")
#load("@npm//@bazel/typescript:index.bzl", "ts_setup_workspace")
#load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
#ts_setup_workspace()

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

#load("@build_bazel_rules_nodejs//packages:index.bzl", "NESTED_PACKAGES")
#local_repository(name="@npm_bazel_jasmine")
#[local_repository(
#     name = "npm_bazel_%s" % name,
#     path = "packages/%s/src" % name,
# ) for name in NESTED_PACKAGES]



#local_repository(
#    name = "build_bazel_rules_typescript",
#    path = "../../third_party/github.com/bazelbuild/rules_typescript",
#)

load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dev_dependencies")

rules_nodejs_dev_dependencies()

#load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dev_dependencies")

#rules_typescript_dev_dependencies()
#load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace"

#load("//packages/karma:package.bzl", "npm_bazel_karma_dependencies")

#npm_bazel_karma_dependencies()


local_repository(
    name = "npm_bazel_jasmine",
    path = "node_modules/@bazel/jasmine",
)
