import { useState, useCallback } from 'react';

const DEFAULT_FORM = `<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-gray-700">Name</label>
    <input type="text" name="name" required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  
  <div>
    <label class="block text-sm font-medium text-gray-700">Phone</label>
    <input type="tel" name="phone" required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  
  <div>
    <label class="block text-sm font-medium text-gray-700">Message</label>
    <textarea name="message" rows="4"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    ></textarea>
  </div>
  
  <button type="submit"
    class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm"
  >
    Send Message
  </button>
</form>`;

export function useWebform() {
  const [webformHtml, setWebformHtml] = useState(() => {
    const saved = localStorage.getItem('webform_html');
    return saved || DEFAULT_FORM;
  });

  const updateWebform = useCallback((html: string) => {
    setWebformHtml(html);
    localStorage.setItem('webform_html', html);
  }, []);

  return {
    webformHtml,
    updateWebform
  };
}