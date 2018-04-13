package(default_visibility = ["//visibility:public"])

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
    srcs = glob([
        "node_modules/**/*.js",
        "node_modules/**/*.d.ts",
        "node_modules/**/*.json",
    ]),
)

exports_files(["tsconfig.json"])
