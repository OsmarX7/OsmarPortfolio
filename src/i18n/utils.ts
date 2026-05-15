import { ui, defaultLang } from "./ui";

/**
 * Extrae el código de idioma de la URL actual.
 * Si la URL es /en/contacto, devuelve 'en'.
 * Si es /contacto (raíz), devuelve el idioma por defecto.
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

/**
 * Crea la función t() para usar en los componentes.
 */
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): any {
    // Usamos ?? en lugar de || para permitir cadenas vacías ""
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Utilidad para generar rutas traducidas.
 * Ayuda a que el switch de idiomas sepa a dónde enviar al usuario.
 */
export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return l === defaultLang ? path : `/${l}${path}`;
  };
}
