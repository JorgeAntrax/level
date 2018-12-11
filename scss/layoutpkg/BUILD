package(default_visibility = ["//visibility:public"])

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_library")
sass_library(
    name = "layoutpkg",
    srcs = ["_all.scss"],
    deps = ["grid","layout"]
)

sass_library(
    name = "grid",
    srcs = ["_grid.scss"],
)

sass_library(
    name = "layout",
    srcs = ["_layout.scss"],
    deps = ["//scss/base:partials"]
)
