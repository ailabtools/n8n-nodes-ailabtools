# AILabTools n8n API Index

This index lists every AILabTools API exposed by the official SDK documentation and shows how to call it from the **AILabTools** n8n community node.

The node has dedicated operations for credits, async task lookup, and selected preset APIs. Every other endpoint can be called with **Custom API Request** by entering the HTTP method, path, JSON parameters, and binary file mappings shown below.

## How to Read This Index

- **n8n operation** tells you which operation to select in the AILabTools node.
- **HTTP** is the method and path to enter when using **Custom API Request**.
- **File fields** are the AILabTools multipart field names to add under **File Fields**. Fields marked `(required)` are required by the API docs.
- **Required non-file fields** should go into **Body Parameters JSON** for POST APIs or **Query Parameters JSON** for GET APIs.
- Open the linked API docs for optional parameters, supported enum values, billing notes, and response fields.

Total endpoints: **93**.

## Common

| API | HTTP | n8n operation | File fields | Required non-file fields | SDK method |
| --- | --- | --- | --- | --- | --- |
| [Querying Async Task Results API](https://www.ailabtools.com/docs/ai-common/async-task-results/api) | `GET /api/common/query-async-task-result` | Query Async Task | - | `task_id` | `common.commonQueryAsyncTaskResult()` |
| [Querying Credits API](https://www.ailabtools.com/docs/ai-common/querying-credits/api) | `GET /api/common/query-credits` | Query Credits | - | - | `common.commonQueryCredits()` |

## Image

| API | HTTP | n8n operation | File fields | Required non-file fields | SDK method |
| --- | --- | --- | --- | --- | --- |
| Querying Async Task Results API _(legacy)_ | `GET /api/image/asyn-task-results` | Custom API Request | - | `job_id`, `type` | `image.imageQueryingAsyncTaskResults()` |
| [AI Image Extender API](https://www.ailabtools.com/docs/ai-image/editing/ai-image-extender/api) | `POST /api/image/editing/ai-image-extender` | Call Preset API -> AI Image Extender | `image` (required), `mask` | - | `image.imageAiImageExtender()` |
| [AI Object Replacer API](https://www.ailabtools.com/docs/ai-image/editing/ai-object-replacer/api) | `POST /api/image/editing/ai-object-replacer` | Call Preset API -> AI Object Replacer | `image` (required), `mask` (required) | - | `image.imageAiObjectReplacer()` |
| [AI Image Cropping API](https://www.ailabtools.com/docs/ai-image/editing/image-cropping/api) | `POST /api/image/editing/image-cropping` | Custom API Request | `image` (required) | `width`, `height` | `image.imageAIImageCropping()` |
| Image Erasure API _(legacy)_ | `POST /api/image/editing/image-erase` | Custom API Request | `image` (required), `user_mask` (required) | - | `image.imageErasure()` |
| [Image Invisible Picture Watermark API](https://www.ailabtools.com/docs/ai-image/editing/image-invisible-image-watermark/api) | `POST /api/image/editing/image-invisible-image-watermark` | Custom API Request | `origin_image`, `logo`, `watermark_image` | `function_type` | `image.imageInvisibleImageWatermark()` |
| [Image Invisible Text Watermark API](https://www.ailabtools.com/docs/ai-image/editing/image-invisible-text-watermarking/api) | `POST /api/image/editing/image-invisible-text-watermarking` | Custom API Request | `origin_image`, `watermark_image` | `function_type` | `image.imageInvisibleTextWatermark()` |
| [Intelligent Composition API](https://www.ailabtools.com/docs/ai-image/editing/intelligent-composition/api) | `POST /api/image/editing/intelligent-composition` | Custom API Request | `image` (required) | - | `image.imageIntelligentComposition()` |
| [Photo Retouch API](https://www.ailabtools.com/docs/ai-image/editing/photo-retouching/api) | `POST /api/image/editing/photo-retouching` | Custom API Request | `image` (required), `style` (required) | - | `image.imagePhotoEditing()` |
| [Remove Objects API](https://www.ailabtools.com/docs/ai-image/editing/remove-objects/api) | `POST /api/image/editing/remove-objects` | Call Preset API -> Remove Objects | `image` (required), `mask` (required) | - | `image.imageRemoveObjects()` |
| [Remove Objects Advanced API](https://www.ailabtools.com/docs/ai-image/editing/remove-objects-advanced/api) | `POST /api/image/editing/remove-objects-advanced` | Custom API Request | `image` (required), `mask` (required) | - | `image.imageRemoveObjectsAdvanced()` |
| [Remove Objects Pro API](https://www.ailabtools.com/docs/ai-image/editing/remove-objects-pro/api) | `POST /api/image/editing/remove-objects-pro` | Custom API Request | `image` (required), `mask` (required) | - | `image.imageRemoveObjectsPro()` |
| [AI Cartoon Generator API](https://www.ailabtools.com/docs/ai-image/effects/ai-anime-generator/api) | `POST /api/image/effects/ai-anime-generator` | Custom API Request | `image` (required) | `task_type`, `type` | `image.imageAICartoonGenerator()` |
| [AI Photo Colorize API](https://www.ailabtools.com/docs/ai-image/effects/image-colorization/api) | `POST /api/image/effects/image-colorization` | Custom API Request | `image` (required) | - | `image.imageColoring()` |
| [Photo to Painting API](https://www.ailabtools.com/docs/ai-image/effects/image-style-conversion/api) | `POST /api/image/effects/image-style-conversion` | Custom API Request | `image` (required) | `option` | `image.imageStyleTransfer()` |
| Style Transfer API _(legacy)_ | `POST /api/image/effects/image-style-migration` | Custom API Request | `style` (required), `major` (required) | - | `image.imageStyleMigration()` |
| [Image Color Enhancement API](https://www.ailabtools.com/docs/ai-image/enhance/image-color-enhancement/api) | `POST /api/image/enhance/image-color-enhancement` | Custom API Request | `image` (required) | `output_format`, `mode` | `image.imageColorEnhancement()` |
| [Image Contrast Enhancement API](https://www.ailabtools.com/docs/ai-image/enhance/image-contrast-enhancement/api) | `POST /api/image/enhance/image-contrast-enhancement` | Custom API Request | `image` (required) | - | `image.imageContrastEnhancement()` |
| [Image Dehaze API](https://www.ailabtools.com/docs/ai-image/enhance/image-defogging/api) | `POST /api/image/enhance/image-defogging` | Custom API Request | `image` (required) | - | `image.imageDehaze()` |
| [Image Upscaler API](https://www.ailabtools.com/docs/ai-image/enhance/image-lossless-enlargement/api) | `POST /api/image/enhance/image-lossless-enlargement` | Call Preset API -> Image Upscaler | `image` (required) | - | `image.imageLosslessEnlargement()` |
| [Image Sharpness Enhancement API](https://www.ailabtools.com/docs/ai-image/enhance/image-sharpness-enhancement/api) | `POST /api/image/enhance/image-sharpness-enhancement` | Custom API Request | `image` (required) | - | `image.imageClarityEnhancement()` |
| [Stretched Image Restoration API](https://www.ailabtools.com/docs/ai-image/enhance/stretch-image-recovery/api) | `POST /api/image/enhance/stretch-image-recovery` | Custom API Request | `image` (required) | - | `image.imageDistortionCorrection()` |
| [Image Composition Aesthetics Score API](https://www.ailabtools.com/docs/ai-image/rating/image-composition-aesthetics-scoring/api) | `POST /api/image/rating/image-composition-aesthetics-scoring` | Custom API Request | `image` (required) | - | `image.imageCompositionAestheticsScore()` |
| [Image Exposure Score API](https://www.ailabtools.com/docs/ai-image/rating/image-exposure-score/api) | `POST /api/image/rating/image-exposure-score` | Custom API Request | `image` (required) | - | `image.imageExposureRating()` |
| [AI Nail Art API](https://www.ailabtools.com/docs/ai-image/editing/ai-nail-art/api) | `POST /api/image/editing/ai-nail-art` | Custom API Request | `image` (required) | `nail_name`, `nail_desc` | `image.imageAINailArt()` |
| [AI Nail Art Pro API](https://www.ailabtools.com/docs/ai-image/editing/ai-nail-art-pro/api) | `POST /api/image/editing/ai-nail-art-pro` | Custom API Request | `image` (required), `reference_image` (required) | - | `image.imageAINailArtPro()` |
| [AI Photography API](https://www.ailabtools.com/docs/ai-image/effects/ai-photography/api) | `POST /api/image/effects/ai-photography` | Custom API Request | `image` (required) | `style_title`, `style_desc` | `image.imageAIPhotography()` |
| [AI Emoji Generator API](https://www.ailabtools.com/docs/ai-image/effects/photo-to-emoji-grid/api) | `POST /api/image/effects/photo-to-emoji-grid` | Custom API Request | `image` (required) | `expression`, `style`, `scene` | `image.imageAIEmojiGenerator()` |
| [Photo to Coloring Page API](https://www.ailabtools.com/docs/ai-image/effects/photo-to-line-art/api) | `POST /api/image/effects/photo-to-line-art` | Custom API Request | `image` (required) | - | `image.imagePhotoToColoringPage()` |
| [AI Flower Wallpaper API](https://www.ailabtools.com/docs/ai-image/generation/ai-flower-wallpaper/api) | `POST /api/image/generation/ai-flower-wallpaper` | Custom API Request | - | - | `image.imageAIFlowerWallpaper()` |

## Portrait

| API | HTTP | n8n operation | File fields | Required non-file fields | SDK method |
| --- | --- | --- | --- | --- | --- |
| [Face Analyzer API](https://www.ailabtools.com/docs/ai-portrait/analysis/face-analyzer/api) | `POST /api/portrait/analysis/face-analyzer` | Call Preset API -> Face Analyzer | `image` (required) | - | `portrait.portraitFaceAnalyzer()` |
| [Face Analyzer Advanced API](https://www.ailabtools.com/docs/ai-portrait/analysis/face-analyzer-advanced/api) | `POST /api/portrait/analysis/face-analyzer-advanced` | Custom API Request | `image` (required) | - | `portrait.portraitFaceAnalyzerAdvanced()` |
| [Facial Landmarks API](https://www.ailabtools.com/docs/ai-portrait/analysis/face-key-points/api) | `POST /api/portrait/analysis/face-key-points` | Custom API Request | `image` (required) | - | `portrait.portraitFacialLandmarks()` |
| [Skin Analyze API](https://www.ailabtools.com/docs/ai-portrait/analysis/skin-analysis/api) | `POST /api/portrait/analysis/skin-analysis` | Custom API Request | `image` (required) | - | `portrait.portraitSkinAnalysisBasic()` |
| [Skin Analyze Advanced API](https://www.ailabtools.com/docs/ai-portrait/analysis/skin-analysis-advanced/api) | `POST /api/portrait/analysis/skin-analysis-advanced` | Custom API Request | `image` (required) | - | `portrait.portraitSkinAnalysisAdvanced()` |
| [Skin Analyze Pro API](https://www.ailabtools.com/docs/ai-portrait/analysis/skin-analysis-pro/api) | `POST /api/portrait/analysis/skin-analysis-pro` | Call Preset API -> Skin Analyze Pro | `image` (required), `left_side_image`, `right_side_image` | - | `portrait.portraitSkinAnalysisProfessional()` |
| Detect Skin Disease API _(legacy)_ | `POST /api/portrait/analysis/skin-disease-detection` | Custom API Request | `image` (required) | - | `portrait.portraitSkinDiseaseDetection()` |
| [Try on Clothes API](https://www.ailabtools.com/docs/ai-portrait/editing/try-on-clothes/api) | `POST /api/portrait/editing/try-on-clothes` | Call Preset API -> Try on Clothes | `person_image` (required), `clothes_image` (required) | `task_type`, `clothes_type` | `portrait.portraitTryOnClothes()` |
| [Try on Clothes Pro API](https://www.ailabtools.com/docs/ai-portrait/editing/try-on-clothes-pro/api) | `POST /api/portrait/editing/try-on-clothes-pro` | Call Preset API -> Try on Clothes Pro | `person_image` (required), `top_garment` (required), `bottom_garment` | `task_type` | `portrait.portraitTryOnClothesPro()` |
| [Face Blur API](https://www.ailabtools.com/docs/ai-portrait/effects/blurred-faces/api) | `POST /api/portrait/effects/blurred-faces` | Custom API Request | `image` (required) | - | `portrait.portraitFacialBlurring()` |
| [Change Facial Expressions API](https://www.ailabtools.com/docs/ai-portrait/effects/emotion-editor/api) | `POST /api/portrait/effects/emotion-editor` | Custom API Request | `image_target` (required) | `service_choice` | `portrait.portraitExpressionEditing()` |
| [AI Face Enhancer API](https://www.ailabtools.com/docs/ai-portrait/effects/ai-face-enhancer/api) | `POST /api/portrait/effects/enhance-face` | Call Preset API -> AI Face Enhancer | `image` (required) | - | `portrait.portraitFaceRestorationEnhancement()` |
| [Age & Gender Swap API](https://www.ailabtools.com/docs/ai-portrait/effects/face-attribute-editing/api) | `POST /api/portrait/effects/face-attribute-editing` | Custom API Request | `image` (required) | `action_type` | `portrait.portraitFaceAttributeEditing()` |
| [Face Beauty API](https://www.ailabtools.com/docs/ai-portrait/effects/face-beauty/api) | `POST /api/portrait/effects/face-beauty` | Custom API Request | `image` (required) | `sharp`, `smooth`, `white` | `portrait.portraitFacialBeautification()` |
| [Face Beauty Advanced API](https://www.ailabtools.com/docs/ai-portrait/effects/face-beauty-advanced/api) | `POST /api/portrait/effects/face-beauty-advanced` | Custom API Request | `image` (required) | - | `portrait.portraitFacialBeautificationAdvanced()` |
| [Face Beauty Pro API](https://www.ailabtools.com/docs/ai-portrait/effects/face-beauty-pro/api) | `POST /api/portrait/effects/face-beauty-pro` | Custom API Request | `image` (required) | - | `portrait.portraitFacialBeautificationPro()` |
| [Face Filters API](https://www.ailabtools.com/docs/ai-portrait/effects/face-filter/api) | `POST /api/portrait/effects/face-filter` | Custom API Request | `image` (required) | `resource_type`, `strength` | `portrait.portraitFacialFilters()` |
| [Merge Portraits API](https://www.ailabtools.com/docs/ai-portrait/effects/face-fusion/api) | `POST /api/portrait/effects/face-fusion` | Custom API Request | `image_target` (required), `image_template` (required) | - | `portrait.portraitFaceFusion()` |
| Hairstyle Changer API _(legacy)_ | `POST /api/portrait/effects/hairstyle-editor` | Custom API Request | `image_target` (required) | - | `portrait.portraitHairstyleEditing()` |
| [Hairstyle Changer Pro API](https://www.ailabtools.com/docs/ai-portrait/effects/hairstyle-editor-pro/api) | `POST /api/portrait/effects/hairstyle-editor-pro` | Call Preset API -> Hairstyle Changer Pro | `image` (required), `mask` | `task_type`, `hair_style` | `portrait.portraitHairstyleEditingPro()` |
| [Lips Color Changer API](https://www.ailabtools.com/docs/ai-portrait/effects/lips-color-changer/api) | `POST /api/portrait/effects/lips-color-changer` | Custom API Request | `image` (required) | `lip_color_infos` | `portrait.portraitLipsColorChanger()` |
| Live Photos API _(legacy)_ | `POST /api/portrait/effects/live-photo` | Custom API Request | `image_target` (required) | - | `portrait.portraitLivePhotos()` |
| [Cartoon Yourself API](https://www.ailabtools.com/docs/ai-portrait/effects/portrait-animation/api) | `POST /api/portrait/effects/portrait-animation` | Call Preset API -> Cartoon Yourself | `image` (required) | `type` | `portrait.portraitCartoonYourself()` |
| [Smart Beauty API](https://www.ailabtools.com/docs/ai-portrait/effects/smart-beauty/api) | `POST /api/portrait/effects/smart-beauty` | Custom API Request | `image_target` (required) | - | `portrait.portraitIntelligentBeautification()` |
| [AI Face Slimming API](https://www.ailabtools.com/docs/ai-portrait/effects/smart-face-slimming/api) | `POST /api/portrait/effects/smart-face-slimming` | Custom API Request | `image` (required) | - | `portrait.portraitIntelligentFaceSlimming()` |
| [AI Skin Beauty API](https://www.ailabtools.com/docs/ai-portrait/effects/smart-skin/api) | `POST /api/portrait/effects/smart-skin` | Custom API Request | `image` (required) | - | `portrait.portraitIntelligentSkinRetouching()` |
| [Try on Clothes Refiner API](https://www.ailabtools.com/docs/ai-portrait/enhance/try-on-clothes-refiner/api) | `POST /api/portrait/enhance/try-on-clothes-refiner` | Custom API Request | `person_image` (required), `top_garment` (required), `coarse_image` (required), `bottom_garment` | `task_type`, `gender` | `portrait.portraitTryOnClothesRefiner()` |
| [AI Face Rating API](https://www.ailabtools.com/docs/ai-portrait/analysis/ai-face-rating/api) | `POST /api/portrait/analysis/ai-face-rating` | Custom API Request | `image` (required) | - | `portrait.portraitAIFaceRating()` |
| [AI Bald API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-bald/api) | `POST /api/portrait/editing/ai-bald` | Custom API Request | `image` (required) | - | `portrait.portraitAIBald()` |
| [AI Beard Removal API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-beard-removal/api) | `POST /api/portrait/editing/ai-beard-removal` | Custom API Request | `image` (required) | - | `portrait.portraitAIBeardRemoval()` |
| [AI Beard Styling API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-beard-styling/api) | `POST /api/portrait/editing/ai-beard-styling` | Custom API Request | `image` (required), `image_template` | - | `portrait.portraitAIBeardStyling()` |
| [AI Breast Expansion API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-breast-expansion/api) | `POST /api/portrait/editing/ai-big-tits` | Custom API Request | `person_image` (required) | - | `portrait.portraitAIBreastExpansion()` |
| [AI Butt Enhancement API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-butt-enhancement/api) | `POST /api/portrait/editing/ai-butt-enhancement` | Custom API Request | `image` (required) | - | `portrait.portraitAIButtEnhancement()` |
| [AI Colored Contacts API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-colored-contacts/api) | `POST /api/portrait/editing/ai-colored-contacts` | Custom API Request | `image` (required) | - | `portrait.portraitAIColoredContacts()` |
| [AI Eyebrows API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-eyebrows/api) | `POST /api/portrait/editing/ai-eyebrows` | Custom API Request | `image` (required), `reference_image` (required) | - | `portrait.portraitAIEyebrows()` |
| [AI Eyelashes API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-eyelashes/api) | `POST /api/portrait/editing/ai-eyelashes` | Custom API Request | `image` (required) | - | `portrait.portraitAIEyelashes()` |
| [AI Eyeshadow Try-On API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-eyeshadow/api) | `POST /api/portrait/editing/ai-eyeshadow` | Custom API Request | `image` (required), `image_template` | - | `portrait.portraitAIEyeshadowTryOn()` |
| [AI Face Swap API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-face-swap/api) | `POST /api/portrait/editing/ai-face-swap` | Call Preset API -> AI Face Swap | `image_target` (required), `image_template` (required) | - | `portrait.portraitAIFaceSwap()` |
| [AI Fat Filter API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-fat-filter/api) | `POST /api/portrait/editing/ai-fat-filter` | Custom API Request | `image` (required) | - | `portrait.portraitAIFatFilter()` |
| [AI Hair Color API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-hair-color/api) | `POST /api/portrait/editing/ai-hair-color` | Custom API Request | `image` (required) | - | `portrait.portraitAIHairColor()` |
| [AI Hair Loss Simulation API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-hair-loss-simulation/api) | `POST /api/portrait/editing/ai-hair-loss-simulation` | Custom API Request | `image` (required) | `level` | `portrait.portraitAIHairLossSimulation()` |
| [AI Lip Enhancement API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-lip-enhancement/api) | `POST /api/portrait/editing/ai-lip-enhancement` | Custom API Request | `image` (required) | - | `portrait.portraitAILipEnhancement()` |
| [AI Waist Slimming API](https://www.ailabtools.com/docs/ai-portrait/editing/ai-waist-slimming/api) | `POST /api/portrait/editing/ai-waist-slimming` | Custom API Request | `image` (required) | - | `portrait.portraitAIWaistSlimming()` |
| [Try on Clothes Premium API](https://www.ailabtools.com/docs/ai-portrait/editing/try-on-clothes-premium/api) | `POST /api/portrait/editing/try-on-clothes-premium` | Custom API Request | `person_image` (required), `top_garment` (required), `bottom_garment` | `task_type` | `portrait.portraitTryOnClothesPremium()` |
| [AI Big Head Effect API](https://www.ailabtools.com/docs/ai-portrait/effects/ai-big-head-effect/api) | `POST /api/portrait/effects/ai-big-head-effect` | Custom API Request | `image` (required) | - | `portrait.portraitAIBigHeadEffect()` |
| [AI Halloween Mask API](https://www.ailabtools.com/docs/ai-portrait/effects/ai-halloween-mask/api) | `POST /api/portrait/effects/ai-halloween-mask` | Custom API Request | `image` (required), `image_template` | - | `portrait.portraitAIHalloweenMask()` |
| [AI Lip Bite Expressions API](https://www.ailabtools.com/docs/ai-portrait/effects/ai-lip-bite-expressions/api) | `POST /api/portrait/effects/ai-lip-bite-expressions` | Custom API Request | `image` (required) | - | `portrait.portraitAILipBiteExpressions()` |
| [AI Red Lip Gloss API](https://www.ailabtools.com/docs/ai-portrait/effects/ai-red-lip-gloss/api) | `POST /api/portrait/effects/ai-red-lip-gloss` | Custom API Request | `image` (required) | - | `portrait.portraitAIRedLipGloss()` |
| [AI Square Face Filter API](https://www.ailabtools.com/docs/ai-portrait/effects/ai-square-face-filter/api) | `POST /api/portrait/effects/ai-square-face-filter` | Custom API Request | `image` (required) | - | `portrait.portraitAISquareFaceFilter()` |
| [Change Facial Expressions Advanced API](https://www.ailabtools.com/docs/ai-portrait/effects/emotion-editor-advanced/api) | `POST /api/portrait/effects/emotion-editor-advanced` | Custom API Request | `image` (required) | `expression` | `portrait.portraitExpressionEditingAdvanced()` |
| [Hairstyle Changer Premium API](https://www.ailabtools.com/docs/ai-portrait/effects/hairstyle-editor-premium/api) | `POST /api/portrait/effects/hairstyle-editor-premium` | Custom API Request | `image` (required), `image_template` | - | `portrait.portraitHairstyleEditingPremium()` |
| [AI Skin Enhancement Advanced API](https://www.ailabtools.com/docs/ai-portrait/effects/smart-skin-advanced/api) | `POST /api/portrait/effects/smart-skin-advanced` | Custom API Request | `image` (required) | - | `portrait.portraitAISkinEnhancementAdvanced()` |

## Cutout

| API | HTTP | n8n operation | File fields | Required non-file fields | SDK method |
| --- | --- | --- | --- | --- | --- |
| [Costume Background Removal API](https://www.ailabtools.com/docs/ai-cutout/general/apparel-background-removal/api) | `POST /api/cutout/general/apparel-background-removal` | Custom API Request | `image` (required) | - | `cutout.cutoutClothingBackgroundRemoval()` |
| [Product Background Removal API](https://www.ailabtools.com/docs/ai-cutout/general/commodity-background-removal/api) | `POST /api/cutout/general/commodity-background-removal` | Custom API Request | `image` (required) | - | `cutout.cutoutProductBackgroundRemoval()` |
| [Food Background Removal API](https://www.ailabtools.com/docs/ai-cutout/general/food-background-removal/api) | `POST /api/cutout/general/food-background-removal` | Custom API Request | `image` (required) | - | `cutout.cutoutFoodBackgroundRemoval()` |
| [Universal Background Removal API](https://www.ailabtools.com/docs/ai-cutout/general/universal-background-removal/api) | `POST /api/cutout/general/universal-background-removal` | Call Preset API -> Universal Background Removal | `image` (required) | - | `cutout.cutoutUniversalBackgroundRemoval()` |
| [Head Extraction API](https://www.ailabtools.com/docs/ai-cutout/portrait/avatar-extraction/api) | `POST /api/cutout/portrait/avatar-extraction` | Custom API Request | `image` (required) | - | `cutout.cutoutAvatarExtraction()` |
| [Hairstyle Extraction API](https://www.ailabtools.com/docs/ai-cutout/portrait/hairstyle-extraction/api) | `POST /api/cutout/portrait/hairstyle-extraction` | Custom API Request | `image` (required) | - | `cutout.cutoutHairExtraction()` |
| [Human Background Removal API](https://www.ailabtools.com/docs/ai-cutout/portrait/portrait-background-removal/api) | `POST /api/cutout/portrait/portrait-background-removal` | Call Preset API -> Portrait Background Removal | `image` (required) | - | `cutout.cutoutHumanBackgroundRemoval()` |
| [HD Universal Background Removal API](https://www.ailabtools.com/docs/ai-cutout/general/hd-universal-background-removal/api) | `POST /api/cutout/general/hd-universal-background-removal` | Custom API Request | `image` (required) | - | `cutout.cutoutHDUniversalBackgroundRemoval()` |
| [HD Human Background Removal API](https://www.ailabtools.com/docs/ai-cutout/portrait/hd-portrait-background-removal/api) | `POST /api/cutout/portrait/hd-portrait-background-removal` | Custom API Request | `image` (required) | - | `cutout.cutoutHdHumanBodyBackgroundRemoval()` |

## Custom API Request Template

For endpoints marked **Custom API Request**, configure the AILabTools node like this:

- **Operation**: `Custom API Request`
- **Method**: the method from the HTTP column
- **Path**: the path from the HTTP column, for example `/api/image/enhance/image-lossless-enlargement`
- **Body Parameters JSON**: non-file POST fields, using AILabTools API field names such as `return_form` or `upscale_factor`
- **Query Parameters JSON**: GET query fields such as `task_id`
- **File Fields**: map each AILabTools file field name to the incoming n8n binary property name, for example `image` -> `data`

Example **Body Parameters JSON**:

```json
{
	"return_form": "whiteBK"
}
```

Example **File Fields** mapping:

| AILabTools Field Name | Input Binary Property |
| --- | --- |
| `image` | `data` |
