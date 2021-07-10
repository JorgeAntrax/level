package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm", "nodejs_binary")
#load("@build_bazel_rules_typescript//:defs.bzl", "ts_library")
#load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@npm//@bazel/typescript:index.bzl", "ts_library")
#load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

#ts_library(
#    name = "appts",
#    srcs = ["app.ts"],
#    module_name = "appts",
#)

ts_library(
    name = "server",
    srcs = ["server.ts"],
    deps = [
        #        ":appts",
        "@npm//express",
        "@npm//@types/express",
    ],
    #node_modules = "//:node_modules",
)

#pkg_npm(
#    name = 'pkg',
#    srcs = ['package.json'],
#    deps = [':lib'],
#    visibility = ['//visibility:public'],
#)

#genrule(
#    name = "copy_pugsite",
#    srcs = ["index.pug"],
#    outs = ["views/index.pug"],
#    cmd = "cp $< $@",
#)

nodejs_binary(
    name = "app",
    data = [
        "server",
        "//scss:kimera",
        "//site/ts:kimerajs",
        "//views:index.pug",
        "//views/components:_all.pug",
        "//views/components:blockquote.pug",
        "//views/components:box.pug",
        "//views/components:buttons.pug",
        "//views/components:chip.pug",
        "//views/components:dropdown.pug",
        "//views/components:icons.pug",
        "//views/components:preload.pug",
        "//views/components:progress.pug",
        "//views/components:range.pug",
        "//views/components:tags.pug",
        "//views/components:toggle.pug",
        "//views/components:tooltip.pug",
        "//views/css:docs",
        "//views/forms:_all.pug",
        "//views/forms:checkbox.pug",
        "//views/forms:color.pug",
        "//views/forms:field.pug",
        "//views/forms:input.pug",
        "//views/forms:radio.pug",
        "//views/forms:select.pug",
        "//views/forms:textarea.pug",
        "//views/grid:_all.pug",
        "//views/grid:align.pug",
        "//views/grid:grid.pug",
        "//views/grid:layout.pug",
        "//views/grid:responsive.pug",
        "//views/intro:_all.pug",
        "//views/intro:_anim.pug",
        "//views/intro:_colors.pug",
        "//views/intro:_contenido.pug",
        "//views/intro:_functions.pug",
        "//views/intro:_home.pug",
        "//views/intro:_introduccion.pug",
        "//views/intro:_mixins.pug",
        "//views/intro:_modular.pug",
        "//views/intro:_typography.pug",
        "//views/intro:features.pug",
        "//views/intro:portafolio.pug",
        "//views/main:_footer.pug",
        "//views/main:_headers.pug",
        "//views/main:_menu.pug",
        "//views/modules:_all.pug",
        "//views/modules:acordeon.pug",
        "//views/modules:breadcrumb.pug",
        "//views/modules:card.pug",
        "//views/modules:group.pug",
        "//views/modules:media.pug",
        "//views/modules:mega.pug",
        "//views/modules:menus.pug",
        "//views/modules:message.pug",
        "//views/modules:modal.pug",
        "//views/modules:navbar.pug",
        "//views/modules:notify.pug",
        "//views/modules:slideshow.pug",
        "//views/modules:social.pug",
        "//views/modules:table.pug",
        "//views/modules:tabs.pug",
        "@npm//express",
        "@npm//pug",
    ],
    entry_point = "kimera/site/pug/server.js",
#    install_source_map_support = False,
)
