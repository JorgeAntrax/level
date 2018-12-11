package(default_visibility = ["//visibility:public"])

load("@io_bazel_rules_sass//:defs.bzl", "sass_library")

sass_library(
    name = "base",
    srcs = ["_all.scss"],
    deps = [
        "core",
        "fontstyles",
        "partials",
    ],
)

sass_library(
    name = "variables",
    srcs = ["_variables.scss"],
)

sass_library(
    name = "placeholders",
    srcs = ["_placeholders.scss"],
)

sass_library(
    name = "functions",
    srcs = ["_functions.scss"],
)

sass_library(
    name = "mixins",
    srcs = ["_mixins.scss"],
)

sass_library(
    name = "fontstyles",
    srcs = ["_font-styles.scss"],
)

sass_library(
    name = "core",
    srcs = ["_core.scss"],
    deps = ["placeholders"],
)

sass_library(
    name = "partials",
    srcs = ["_partials.scss"],
    deps = [
        "functions",
        "mixins",
        "//scss:config",
    ],
)
