package(default_visibility = ["//visibility:public"])

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_library")
sass_library(
    name = "utilities",
    srcs = ["_all.scss"],
    deps = ["helpers","colors","animations"]
)

sass_library(
    name = "helpers",
    srcs = ["_helpers.scss"],
)

sass_library(
    name = "colors",
    srcs = ["_colors.scss"],
)

sass_library(
    name = "animations",
    srcs = ["_animations.scss"],
)
