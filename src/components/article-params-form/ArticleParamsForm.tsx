import { useState, useRef, useEffect, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

interface ArticleParamsFormProps {
	currentAppState: ArticleStateType;
	setAppState: (state: ArticleStateType) => void;
}

/**
 * Компонент боковой панели с формой кастомизации стилей статьи.
 * Управляет локальным состоянием формы до момента отправки (применения) конфигурации.
 */
export const ArticleParamsForm = ({
	currentAppState,
	setAppState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState<ArticleStateType>(currentAppState);

	// Синхронизация локальной формы с внешним состоянием при сбросе или внешних изменениях
	useEffect(() => {
		setFormState(currentAppState);
	}, [currentAppState]);

	const handleFontFamilyChange = (selectedOption: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: selectedOption,
		}));
	};

	const handleFontSizeChange = (selectedOption: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: selectedOption,
		}));
	};

	const handleFontColorChange = (selectedOption: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontColor: selectedOption,
		}));
	};

	const handleBackgroundColorChange = (selectedOption: OptionType) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: selectedOption,
		}));
	};

	const handleContentWidthChange = (selectedOption: OptionType) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: selectedOption,
		}));
	};

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setAppState(formState);
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='Шрифт'
						onChange={handleFontFamilyChange}
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					{/* Разделитель между блоком типографики и блоком цветов/размеров */}
					<div className={styles.divider} />

					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						title='Цвет шрифта'
						onChange={handleFontColorChange}
					/>

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						title='Цвет фона'
						onChange={handleBackgroundColorChange}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						title='Ширина контента'
						onChange={handleContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
