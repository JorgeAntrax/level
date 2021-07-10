package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

#load("@angular//:index.bzl", "ng_module")

#
#ng_module(
#    name = "src",
#    srcs = glob(["*.ts"]),
#    tsconfig = ":tsconfig.json",
#    deps = ["//src/hello-world"],
#)

filegroup(
    name = "node_modules",
    srcs = glob(
        include = [
            "node_modules/**/*.js",
            "node_modules/**/*.d.ts",
            "node_modules/**/*.json",
            "node_modules/.bin/*",
        ],
        exclude = [
            # Files under test & docs may contain file names that
            # are not legal Bazel labels (e.g.,
            # node_modules/ecstatic/test/public/中文/檔案.html)
            "node_modules/**/test/**",
            "node_modules/**/docs/**",
            # Files with spaces in the name are not legal Bazel labels
            "node_modules/**/* */**",
            "node_modules/**/* *",
        ],
    ),
     visibility = ["//visibility:public"]
)

# Create a tsc_wrapped compiler rule to use in the ts_library
# compiler attribute when using self-managed dependencies
#nodejs_binary(
#    name = "@bazel/typescript/tsc_wrapped",
#    entry_point = "@bazel/typescript/tsc_wrapped/tsc_wrapped.js",
#    # Point bazel to your node_modules to find the entry point
#    node_modules = ["//:node_modules"],
#    # The --expose-gc node option is required for tsc_wrapped
#    templated_args = ["--node_options=--expose-gc"],
#)
#
#nodejs_binary(
#    name = "karma/karma",
#    entry_point = "karma/bin/karma",
#    # Point bazel to your node_modules to find the entry point
#    node_modules = ["//:node_modules"],
#)

# Create a tsc_wrapped compiler rule to use in the ts_library
# compiler attribute when using self-managed dependencies
#nodejs_binary(
#    name = "@bazel/typescript/tsc_wrapped",
#    entry_point = "@npm//:node_modules/@bazel/typescript/internal/tsc_wrapped/tsc_wrapped.js",
    # Point bazel to your node_modules to find the entry point
#    node_modules = "//:node_modules",
#)

exports_files(["tsconfig.json"])
#exports_files(["tsconfig.json"], visibility = ["//visibility:public"])
