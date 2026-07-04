export const INFLATION_SIMULATOR_RE =
  /African Currency vs Bitcoin|bitcoin.inflation.simulator|Calculate your wealth loss/i

export function isInflationSimulatorPage(rawHtml: string | undefined | null): boolean {
  return Boolean(rawHtml && INFLATION_SIMULATOR_RE.test(rawHtml))
}
