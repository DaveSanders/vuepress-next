import type { Theme } from '@vuepress/core'
import { path } from '@vuepress/utils'
import {
  assignDefaultOptions,
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptions,
  resolveContainerPluginOptionsForDetails,
  resolveGitPluginOptions,
  resolveMediumZoomPluginOptions,
} from './node'
import type { DefaultThemeOptions } from './types'

export * from './node'
export * from './types'

export const defaultTheme: Theme<DefaultThemeOptions> = (options) => {
  assignDefaultOptions(options)

  return {
    name: '@vuepress/theme-default',

    layouts: path.resolve(__dirname, './layouts'),

    clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

    clientAppSetupFiles: path.resolve(__dirname, './clientAppSetup.js'),

    /**
     * Require the relative file path to generate edit link
     */
    extendsPageData: ({ filePathRelative }) => ({ filePathRelative }),

    plugins: [
      [
        '@vuepress/active-header-links',
        resolveActiveHeaderLinksPluginOptions(options),
      ],
      ['@vuepress/back-to-top', options.themePlugins?.backToTop !== false],
      ['@vuepress/container', resolveContainerPluginOptions(options, 'tip')],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(options, 'warning'),
      ],
      ['@vuepress/container', resolveContainerPluginOptions(options, 'danger')],
      ['@vuepress/container', resolveContainerPluginOptionsForDetails(options)],
      ['@vuepress/git', resolveGitPluginOptions(options)],
      ['@vuepress/medium-zoom', resolveMediumZoomPluginOptions(options)],
      ['@vuepress/nprogress', options.themePlugins?.nprogress !== false],
    ],
  }
}

export default defaultTheme
