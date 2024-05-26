const FullWindowSpinner = () => {
    return (
        <div className="h-[100vh] w-[100vw] backdrop-filter backdrop-brightness-75 backdrop-blur-sm bg-blend-overlay absolute z-[999999]">
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-primary animate-spin absolute top-[40%] left-[50%]"></div>
        </div>
    );
};

export default FullWindowSpinner;
