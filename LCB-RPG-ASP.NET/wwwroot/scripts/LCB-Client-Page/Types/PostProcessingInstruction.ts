export enum PostProcessingInstruction{
        "Bloom.Weak", //Do not define bloom intensities here - consider what happens if an instruction requires multiple values!
        "Bloom.Middling",
        "Bloom.Strong",
        "Bloom.VeryStrong"
}