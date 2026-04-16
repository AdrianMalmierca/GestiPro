export default function AuthLayout({
  children, //we recieve the children like log in and register pages, but we dont do anything with them, we just render them.
  // This layout is just a wrapper for the auth pages, we can add some common styles or components here if we want.
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}