export type FakeStatus = { name: string; active: boolean };

export async function loadFakeStatus(name: string): Promise<FakeStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('status-loaded');
      resolve({ name, active: true });
    }, 300);
  });
}
