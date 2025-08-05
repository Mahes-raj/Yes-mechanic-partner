export const Card = ({ children, className }: any) => (
	<div className={`bg-white rounded-2xl p-4 shadow-md ${className}`}>
		{children}
	</div>
);

export const CardContent = ({ children }: any) => <div>{children}</div>;
