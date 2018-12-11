package(default_visibility = ["//visibility:public"])

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_library")
load("@io_bazel_rules_sass//sass:sass.bzl", "sass_binary")

sass_library(
    name = "config",
    srcs = ["_config.scss"],
)

sass_binary(
    name = "kimera",
    src = "kimera.scss",
    deps = [
        "//scss/base",
        "//scss/components",
        "//scss/layoutpkg",
        "//scss/modules",
        "//scss/utilities",
    ],
)
